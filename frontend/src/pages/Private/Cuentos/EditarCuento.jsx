import { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import htmlDocx from "html-docx-js/dist/html-docx";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDocument,
  saveDocument,
} from "../../../redux/states/document.state";
import { /* nombreLenguages, */ textToAudio, voces } from "../../../services/textToAudio.service";
import { useParams } from "react-router-dom";
import { actualizarCuento } from "../../../services/cuento.service";
import { BASE_URL } from "../../../constants/routes";



const EditarCuento = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const [urlAudio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [voz, setVoz] = useState("");
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.document);
  const [cuento, setCuento] = useState(null);
  //const [lenguages, setLenguages] = useState([]);
  const [listVoces, setVoces] = useState([]);



  useEffect(() => {
    const fetchCuento = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getTexto/${id}`);
        const data = await response.json();
        setCuento(data);
        const { imagen, titulo, texto, audio } = data;
        setAudio(audio);

        const vocesIdiomaActual = await voces({ languageCode: data.languageCode });
        setVoz(data.languageCode);
        setVoces(vocesIdiomaActual);

        /* const resp = await nombreLenguages();
        setLenguages(resp);   */

        //console.log(texto);
        const paragraphs = texto.split("\n\n");
        //console.log(paragraphs);

        const tituloImagen = `
                          <div style="background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-cartoon-fairy-tale-field-background-design-backgroundillustration-backgroundfairy-tale-image_64088.jpg); 
                          background-size: cover; 
                          background-position: center; 
                          width: 100%; 
                          height: 710px; 
                          margin-bottom: 50px;">
                                <div style="display: flex; 
                                        flex-direction: column; 
                                        justify-content: center; 
                                        align-items: center;">
                                    <strong>
                                    <h1 style="margin: 30px;">
                                    <span style="font-family: georgia, palatino, serif; font-size: 36px;">${titulo}</span>
                                    </h1>
                                    </strong>
                                      <img
                                        src="${imagen}"
                                        alt="imagen"
                                        style="width: 51%; height: 500px;"
                                      />
                                </div>
                            </div>`;
        let contenido = tituloImagen;
        paragraphs.forEach((paragraph/* , index */) => {
          contenido += `<div
                                    style="
                                      background-image: url(https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-cartoon-fairy-tale-field-background-design-backgroundillustration-backgroundfairy-tale-image_64088.jpg);
                                      background-size: cover;
                                      background-position: center;
                                      width: 100%;
                                      height: 710px;
                                      margin-bottom: 50px;
                                      display: flex;
                                      flex-direction: column;
                                      justify-content: center;
                                      align-items: center;
                                    "
                                  >
                                    <strong>
                                      <p
                                        style="
                                          font-size: 48px;
                                          text-align: center;
                                          display: flex;
                                          justify-content: center;
                                          align-items: center;
                                        "
                                      >
                                      ${paragraph}
                                      </p>
                                    </strong>
                                </div> `;
        });
        dispatch(saveDocument(contenido));

      } catch (error) {
        console.log(error);
      }
    };

    fetchCuento();



  }, [id]);


  const obtenerTitulo = (text) => {
    const inicio = text.indexOf('"'); // Obtén la posición de la primera comilla doble y agrega 1 para saltarla
    const fin = text.indexOf('"', inicio + 1); // Obtén la posición de la segunda comilla doble
    return text.substring(inicio, fin + 1);
  }

  const obtenerTexto = (textoSinTitulo) => {
    const paragraphs = textoSinTitulo.split("\n").filter(parrafo => parrafo.trim() !== "");
    let textoFinal = "";
    paragraphs.forEach((paragraph, /* index */) => {
      textoFinal += paragraph.trim() + "\n\n";
    });

    return textoFinal;
  }

  const handleActualizar = async () => {
    //console.log(cuento.texto);
    try {

      const tempElement = document.createElement("div");
      tempElement.innerHTML = content;
      const text = tempElement.textContent || tempElement.innerText;

      const tituloActualizado = obtenerTitulo(text);
      const textoSinTitulo = text.replace(tituloActualizado, "");
      //console.log(textoActualizado);
      const textoActualizado = obtenerTexto(textoSinTitulo);

      console.log(textoActualizado);
      const textoCompleto = tituloActualizado + "/n" + textoActualizado;
      console.log(textoCompleto);
      //await crearAudio(textoCompleto);


      const res = await textToAudio({
        arg: { text: textoCompleto, voiceId: voz, languageCode: cuento.languageCode, engine: "neural" },
      });
      //console.log(res.SynthesisTask.OutputUri);
      //setAudio(nuevaurl);
      setLoading(true);
      setTimeout(async () => {
        console.log("Después de 15 segundo");
        const nuevaurl = res.SynthesisTask.OutputUri;
        setAudio(nuevaurl);

        const response = await actualizarCuento({ id: id, personaje: cuento.personaje, nombrePersonaje: cuento.nombrePersonaje, tema: cuento.tema, reflexion: cuento.reflexion, titulo: tituloActualizado, audio: nuevaurl, imagen: cuento.imagen, texto: textoActualizado, nombreIdioma: cuento.idioma, idUser: cuento.authorId });
        console.log(response);
        setLoading(false);
      }, 20000);



    } catch (error) {
      console.log(error);
    }


  }




  const config = {
    width: "100%",
    readonly: false,
    height: 600,
  };

  const handleExportToWord = () => {
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body background="https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-cartoon-fairy-tale-field-background-design-backgroundillustration-backgroundfairy-tale-image_64088.jpg"> 
    ${content} 
    </body>
    </html>`;
    const convertedDocx = htmlDocx.asBlob(htmlContent);

    // Descargar el archivo .docx
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(convertedDocx);
    downloadLink.download = "documento.docx";
    downloadLink.click();
  };

  // const crearAudio = async (text) => {
  //   const res = await textToAudio({
  //     arg: { text, voiceId: voz, languageCode: cuento.languageCode, engine: "neural" },
  //   });
  //   //console.log(res.SynthesisTask.OutputUri);
  //   //setAudio(nuevaurl);
  //   setLoading(true);
  //   setTimeout(() => {
  //     console.log("Después de 15 segundo");
  //     const nuevaurl = res.SynthesisTask.OutputUri;
  //     setAudio(nuevaurl);
  //     setLoading(false);
  //   }, 20000);
  // };

  const handleChangeVoz = (e) => {
    setVoz(e.target.value);
    console.log(voz);
  };

  return (
    <>(
      <div className="flex-col w-full ">
        <div className="flex flex-row justify-center items-center mb-4">
          <audio controls className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-4" src={urlAudio}></audio>

          <select className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-4 " name="voz" id="" onChange={handleChangeVoz}>
            {listVoces.map((voz, index) => (
              <option key={index} value={voz}>{voz}</option>
            ))};

          </select>
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-4"
            onClick={handleActualizar}
          >
            Actualizar
          </button>

          {loading && (
            <span className="flex content-center ">

              <img
                className="w-14 h-14 mr-3"
                src="https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif"
                alt="Cargando..."
              />

            </span>
          )}
        </div>

        <div className="text-white flex justify-start">
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-3"
            onClick={() => dispatch(saveDocument(content))}
          >
            Guardar Documento
          </button>
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-3"
            onClick={() => dispatch(loadDocument())}
          >
            Cargar Último
          </button>

          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-3"
            onClick={handleExportToWord}
          >
            exportar a word
          </button>
        </div>
        <div className="mt-3 text-black flex justify-center  items-center ">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => dispatch(saveDocument(newContent))} // preferred to use only this option to update the content for performance reasons
          // onChange={(newContent) => {
          //   //console.log(newContent);
          // }}
          />
        </div>
      </div>

    </>
  );
};

export default EditarCuento;


import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../constants/routes";

const VerCuento = () => {
  const { id } = useParams();
  const [cuento, setCuento] = useState(null);
  const flipBookRef = useRef(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCuento = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getTexto/${id}`);
        const data = await response.json();
        console.log(data.texto);
        setCuento(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCuento();
  }, [id]);

  const goToPrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  if (!cuento) {
    return <p>Cargando el cuento...</p>;
  }

  const { imagen, titulo, texto, audio } = cuento;
  const paragraphs = texto.split("\n\n");
  const pages = [];

  const coverPage = (
    <div
      key="cover"
      className="page rounded-md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "380px",
        width: "100%",
        backgroundColor: "rgba(8, 187, 182, 1)",
      }}
    >
      <div className="page-container">
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Belgrano, serif",
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "#000",
          }}
        >
          {titulo}
        </h2>
      </div>
    </div>
  );

  const endCover = (
    <div
      key="cover"
      className="page rounded-md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "380px",
        width: "100%",
        backgroundColor: "rgba(8, 187, 182, 1)",
      }}
    >
      <div className="page-container">
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Belgrano, serif",
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "#000",
          }}
        >
          Fin
        </h2>
      </div>
    </div>
  );

  {
    (user.rol === "Narrador" || user.rol === "Piloglota"
      ? pages.push(
        <div
          key="cover"
          className="page"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "380px",
            width: "100%",
            backgroundColor: "rgba(8, 187, 182, 1)",
          }}
        >
          <div className="page-container">
            <img
              src={imagen}
              alt="imagen"
              style={{ width: "500px", height: "380px" }}
            />
          </div>
        </div>
      ) : null)
  }
  pages.push(coverPage);

  paragraphs.forEach((paragraph, index) => {
    const pageContent = (
      <div
        key={index}
        className="page-content rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(250, 250, 250, 250)",
          height: "100%",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            fontFamily: "Belgrano, serif",
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "2rem",
            lineHeight: "1.5",
            textAlign: "justify",
            whiteSpace: "pre-line",
            color: "#000",
          }}
        >
          {paragraph}
        </p>
      </div>
    );
    pages.push(pageContent);
  });

  pages.push(endCover);

  return (
    <div className="w-full p-2 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] rounded-lg shadow-2xl border-t-2 border-blue-200">
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "1000px",
          margin: "0 auto",
          color: "#333",
        }}
      >
        <HTMLFlipBook
          ref={flipBookRef}
          width={800}
          height={600}
          size="stretch"
          minWidth={315}
          maxWidth={800}
          minHeight={400}
          maxHeight={600}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={(event) => console.log("flipped page", event)}
          onChangeOrientation={(isPortrait) =>
            console.log("orientation", isPortrait)
          }
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {pages.map((page, index) => (
            <div key={index} className="page">
              <div
                className="page-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {page}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <button
          onClick={goToPrevPage}
          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-2"
        >
          Anterior
        </button>
        <button
          onClick={goToNextPage}
          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-2"
        >
          Siguiente
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {user.rol === "Narrador" || user.rol === "Piloglota" ? (
          <audio controls className="mb-6 mr-3" src={audio}></audio>
        ) : null
        }
      </div>
    </div>
  );
};

export default VerCuento;

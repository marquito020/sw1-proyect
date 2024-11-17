import { PrismaClient } from "@prisma/client";
import { ChatGPTAPI } from "chatgpt";
import amazonPolly from "../services/amazonPolly.service.js";
import { v4 } from "uuid";
import api from "api";

const chatGPTAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || "",
  completionParams: {
    model: "gpt-4",
  },
});
const sdk = api("@leonardoai/v1.0#28807z41owlgnis8jg");
sdk.auth(process.env.LEONARDO_API_KEY || "");

const ejemploPrompt = `
    Master professional photography, 
    beautiful woman in a bohemian dress and accessories, 
    extreme textures and details, 
    full-body portrait shot, 
    bohemian city landmarks background, 
    64K resolution, cinematic lighting, soft shadows, HDR.
`;
const prisma = new PrismaClient();
const generarTexto = async ({
  personaje,
  nombrePersonaje,
  tema,
  reflexion,
  narrador,
  idioma,
  nombreIdioma,
  idUser,
}) => {
  console.log(
    personaje,
    nombrePersonaje,
    tema,
    reflexion,
    narrador,
    idioma,
    nombreIdioma,
    idUser
  );
  const text = await chatGPTAPI.sendMessage(
    "Creame un cuento con un titulo(El titulo que este de principio todo mayuscula y este entre comillas) y con las siguientes caracteristicas: " +
      ", idioma en el que debes redactar el cuento: " +
      nombreIdioma +
      ", Personaje: " +
      personaje +
      ", Nombre del personaje: " +
      nombrePersonaje +
      ", Tema: " +
      tema +
      ", Reflexion: " +
      reflexion
  );
  const titulo = text.text.split("\n")[0];
  console.log(titulo);
  const textArray = text.text.split("\n");
  textArray.shift();
  const texto = textArray.join("\n");
  console.log(texto);

  const textPrompt = await chatGPTAPI.sendMessage(
    "Describeme al personaje principal en una situación específica como si estuvieras describiendo una imagen. Sé detallado, usa menos de 400 caracteres y escribe en inglés: " +
      texto +
      "\nEjemplo: " +
      ejemploPrompt
  );
  let count = 0;
  let result = "";

  for (let i = 0; i < textPrompt.text.length; i++) {
    if (textPrompt.text[i] !== " ") {
      count++;
    }

    result += textPrompt.text[i];

    if (count === 550) {
      break;
    }
  }
  textPrompt.text = result;
  console.log("Promp: " + textPrompt.text);

  const audio = await generarAudio(text.text, narrador, idioma, "neural");
  console.log(audio.SynthesisTask.OutputUri);

  const imagen = await generarImagen(textPrompt.text);

  console.log(imagen);

  await new Promise((resolve) => setTimeout(resolve, 15000));

  const urlImagen = await getImagenes(imagen.sdGenerationJob.generationId);
  console.log(urlImagen.generations_by_pk.generated_images);

  const newStory = await prisma.cuento.create({
    data: {
      personaje: personaje,
      nombrePersonaje: nombrePersonaje,
      tema: tema,
      reflexion: reflexion,
      titulo: titulo,
      texto: texto,
      audio: audio.SynthesisTask.OutputUri,
      imagen: urlImagen.generations_by_pk.generated_images[0].url,
      authorId: idUser,
      idioma: nombreIdioma,
      languageCode: idioma,
    },
  });

  return newStory;
};

const generarAudio = async (texto, voiceId, languageCode, engine) => {
  console.log(texto, voiceId, languageCode, engine);
  const audio = await new amazonPolly().transform({
    Text: texto,
    OutputFormat: "mp3",
    VoiceId: voiceId,
    LanguageCode: languageCode,
    Engine: engine,
    OutputS3BucketName: process.env.BUCKET || "aws-sw1",
    OutputS3KeyPrefix: v4(),
  });
  return audio;
};

const generarImagen = async (texto) => {
  const response = await sdk.createGeneration({
    prompt: texto,
    modelId: process.env.MODEL_ID_LEONARDO || "default-model-id", // Ajusta el modelo
    width: 1024, // Mejora resolución
    height: 1024,
    num_images: 1,
    presetStyle: "LEONARDO",
    scheduler: "DPM_SOLVER",
    public: true,
    promptMagic: true, // Activa mejoras automáticas del prompt
    tiling: false,
    negative_prompt:
      "mutated hands, extra fingers, deformed face, poorly drawn face, watermark, text, cropped, blurry, low quality, extra limbs, missing limbs, fused fingers",
  });
  return response.data;
};

/* const getImagen = async (id) => {
  const imagen = await sdk.getGenerationById({
    id: id,
  });
  console.log(imagen.data);
  console.log(imagen.data.generations_by_pk.generated_images);
  sdk
    .getGenerationById({
      id: id,
    })
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
  return imagen.data;
}; */

const getImagenes = async (id) => {
  const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.LEONARDO_API_KEY}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    console.log(data.generations_by_pk.generated_images[0].url);
    return data;
  } catch (error) {
    console.error("error:" + error);
    throw error;
  }
};

const getTextos = async () => {
  const textosFound = await prisma.cuento.findMany();
  return textosFound;
};

const getTexto = async (id) => {
  const textoFound = await prisma.cuento.findUnique({ where: { id } });
  return textoFound;
};

const getTextoUser = async (idUser) => {
  const textoFound = await prisma.cuento.findMany({
    where: { authorId: idUser },
  });
  return textoFound;
};

export default { generarTexto, getTexto, getTextoUser, getTextos };

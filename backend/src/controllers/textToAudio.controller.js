import amazonPolly from "../services/amazonPolly.service.js";
import { v4 } from "uuid";

const generarAudio = async (req, res) => {
  try {
    console.log(req.body);
    const { text, voiceId, languageCode, engine } = req.body;
    new amazonPolly()
      .transform({
        Text: text,
        OutputFormat: "mp3",
        VoiceId: voiceId,
        LanguageCode: languageCode,
        Engine: engine,
        OutputS3BucketName: process.env.BUCKET || "aws-sw1-2",
        OutputS3KeyPrefix: v4(),
      })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        console.error(err); // Registra el error en la consola
        return res.status(500).json(err); // Devuelve una respuesta con error
      });
  } catch (error) {
    console.error("ERROR SERVER!", error); // Registra el error en la consola
    return res.status(500).json(error); // Devuelve una respuesta con error
  }
};

const getVoces = async (req, res) => {
  try {
    const { languageCode } = req.body;
    new amazonPolly()
      .getVoicesAndLanguages()
      .then((response) => {
        const voices = response.Voices.filter(
          (voice) => voice.LanguageCode === languageCode
        );
        const voiceName = voices.map((voice) => quitarAcentos(voice.Name));
        return res.status(200).json(voiceName);
      })
      .catch((err) => {
        console.error(err); // Registra el error en la consola
        return res.status(500).json(err); // Devuelve una respuesta con error
      });
  } catch (error) {
    console.error("ERROR SERVER!", error); // Registra el error en la consola
    return res.status(500).json(error); // Devuelve una respuesta con error
  }
};


const getLanguageNames = async (req, res) => {
  try {
    new amazonPolly()
      .getVoicesAndLanguages()
      .then((response) => {
        const voices = response.Voices;
        const languageList = voices.map((voice) => ({
          languageName: voice.LanguageName,
          languageCode: voice.LanguageCode,
        }));

        const uniqueLanguageList = removeDuplicates(languageList);

        return res.status(200).json(uniqueLanguageList);
      })
      .catch((err) => {
        console.error(err); // Registra el error en la consola
        return res.status(500).json(err); // Devuelve una respuesta con error
      });
  } catch (error) {
    console.error("ERROR SERVER!", error); // Registra el error en la consola
    return res.status(500).json(error); // Devuelve una respuesta con error
  }
};


function quitarAcentos(languageName) {
  return languageName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function removeDuplicates(languageList) {
  const uniqueLanguageList = languageList.reduce((uniqueList, language) => {
    const isDuplicate = uniqueList.some(
      (item) => item.languageName === language.languageName
    );
    if (!isDuplicate) {
      uniqueList.push(language);
    }
    return uniqueList;
  }, []);

  return uniqueLanguageList;
}

export default { generarAudio, getVoces, getLanguageNames };

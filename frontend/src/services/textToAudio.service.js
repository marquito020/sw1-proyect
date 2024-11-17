import { BASE_URL } from "../constants/routes";

export const texToAudioUrl = BASE_URL + "/api/textToAudio";
export const vocesUrl = BASE_URL + "/api/voces";
export const lenguagesUrl = BASE_URL + "/api/lenguages";


const textToAudio = async ( { arg }) => {
  const response = await fetch(texToAudioUrl, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

const voces = async ( { languageCode }) => {
  try {
    const response = await fetch(vocesUrl, {
      method: "POST",
      body: JSON.stringify({languageCode}),
      headers: { "Content-Type": "application/json" },
    });
  
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const nombreLenguages = async ( ) => {
  try {
    const response = await fetch(lenguagesUrl);
  
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { textToAudio, voces, nombreLenguages};

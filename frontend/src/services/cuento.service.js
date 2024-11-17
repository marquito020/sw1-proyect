import { BASE_URL } from "../constants/routes";

export const texToAudioUrl = BASE_URL + "/api/generarTexto";
export const actualizarCuentoUrl = BASE_URL + "/api/texto/actualizar";

const crearCuento = async ({
  personaje,
  nombrePersonaje,
  tema,
  reflexion,
  narrador,
  idioma,
  nombreIdioma,
  idUser,
}) => {
  const response = await fetch(texToAudioUrl, {
    method: "POST",
    body: JSON.stringify({
      personaje,
      nombrePersonaje,
      tema,
      reflexion,
      narrador,
      idioma,
      nombreIdioma,
      idUser,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log(data);
  return data;
};



const actualizarCuento = async ({
  id,
  personaje, nombrePersonaje,  tema, reflexion, titulo,audio, imagen, texto, nombreIdioma, idUser,
}) => {
  const response = await fetch(actualizarCuentoUrl, {
    method: "POST",
    body: JSON.stringify({
      id,
      personaje, nombrePersonaje,  tema, reflexion, titulo,audio, imagen,texto,nombreIdioma, idUser,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log(data);
  return data;
};



export { crearCuento, actualizarCuento };

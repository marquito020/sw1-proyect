import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/routes";

const ListaCuento = () => {
  const [cuentos, setCuentos] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí debes realizar la solicitud al backend para obtener el JSON de los cuentos
    const fetchCuentos = async () => {
      try {
        const id = user.id;
        const response = await fetch(
          `${BASE_URL}/api/getTextoUser/${id}`
        );
        const data = await response.json();
        setCuentos(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCuentos();
  }, [user.id]);

  return (
    <div className="w-full p-12 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] rounded-lg shadow-2xl border-t-2 border-blue-200">
      <div className="flex items-end justify-between mb-12 header">
        <div className="title">
          <p className="mb-4 text-4xl font-bold text-gray-800">Mis Cuentos</p>
          <p className="text-2xl font-light text-gray-700">
           Mi colección personal de cuentos
          </p>
        </div>
        <div className="text-end">
          <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className=" relative ">
              <input
                type="text"
                id='"form-subscribe-Search'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter a title"
              />
            </div>
            <button
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {cuentos.length === 0 && <p>No hay cuentos disponibles.</p>}
      {cuentos.length > 0 && (
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
        {cuentos.map((cuento) => (
          <div className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer  w-60 md:w-80"
          /* style={{height: "440px" }} */
            key={cuento.id}
            >
            <a href="#" className="block w-full h-full"
             /* onClick={() => {
              // Aquí puedes agregar la lógica para ver el cuento completo
              console.log("Ver cuento:", cuento.id);
              navigate(`/private/cuento/${cuento.id}`);
              }} */
            >
              <img
                alt="blog photo"
                src={cuento.imagen}
                className="object-cover w-full "
              />
              <div className="w-full p-4 bg-white dark:bg-gray-800">
                <p className="font-medium text-indigo-500 text-md">{cuento.titulo}</p>
                <div>
                  <strong>Personaje:</strong> {cuento.personaje}
                </div> 
                <div>
                <strong>Nombre del Personaje:</strong> {cuento.nombrePersonaje}
                <div>
                  <strong>Idioma:</strong> {cuento.idioma}
                </div>
                </div>
                {/* <div>
                  <strong>Tema:</strong> {cuento.tema}
                </div>
                <div>
                  <strong>Reflexión:</strong> {cuento.reflexion}
                </div> */}
                <div className="flex items-center mt-4">
                <button
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => {
                  // Aquí puedes agregar la lógica para ver el cuento completo
                  console.log("Ver cuento:", cuento.id);
                  navigate(`/private/cuento/${cuento.id}`);
                }}
                >
                Ver
              </button>

              <button
                className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  // Aquí puedes agregar la lógica para ver el cuento completo
                  console.log("editar cuento:", cuento.id);
                  navigate(`/private/cuento/editar/${cuento.id}`);
                }}
                >
                Edit
              </button>
                 
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default ListaCuento;

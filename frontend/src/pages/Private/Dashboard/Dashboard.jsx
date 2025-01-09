import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../constants/routes";
function Dashboard() {
  const navigate = useNavigate();

  const cuentos = [
    {
      id: 1,
      title: "El Principito",
      description: "Un cuento clásico sobre un joven príncipe y sus aventuras.",
      image: "https://via.placeholder.com/300?text=El+Principito", // Sustituye por la URL de la imagen real
      comments: [
        { user: "María", text: "Este cuento me hizo reflexionar sobre la vida." },
        { user: "Carlos", text: "Un libro que todos deberían leer al menos una vez." },
      ],
    },
    {
      id: 2,
      title: "Alicia en el País de las Maravillas",
      description: "Una historia mágica sobre un mundo lleno de maravillas.",
      image: "https://via.placeholder.com/300?text=Alicia+en+el+País+de+las+Maravillas", // Sustituye por la URL de la imagen real
      comments: [
        { user: "Lucía", text: "¡Amo este cuento! Es tan imaginativo y único." },
        { user: "Fernando", text: "Un clásico que siempre entretiene." },
      ],
    },
    {
      id: 3,
      title: "Hansel y Gretel",
      description: "Dos hermanos en un bosque encantado, enfrentando desafíos.",
      image: "https://via.placeholder.com/300?text=Hansel+y+Gretel", // Sustituye por la URL de la imagen real
      comments: [
        { user: "Ana", text: "Este cuento me recuerda a mi infancia." },
        { user: "Pedro", text: "Una historia llena de misterio y aventura." },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 w-full p-12 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] rounded-lg shadow-2xl border-t-2 border-blue-200">
      <header className="border-b-2 border-blue-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">Foro de Cuentos</h1>
          <p className="text-center text-gray-600 mt-4">
            Explora y descubre cuentos fascinantes creados por la comunidad.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cuentos.map((cuento) => (
            <div key={cuento.id} className="bg-white rounded-lg shadow-xl p-6">
              <img
                src={cuento.image}
                alt={cuento.title}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold text-center text-gray-800">
                {cuento.title}
              </h2>
              <p className="text-center text-gray-600 mt-2">{cuento.description}</p>
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => {
                    console.log(`Navegando a: ${PrivateRoutes.DETALLECUENTO.replace(":id", cuento.id)}`);
                    navigate(`${PrivateRoutes.DETALLECUENTO.replace(":id", cuento.id)}`);
                  }}
                >
                  Ver Más
                </button>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Comentarios:</h3>
                <ul className="mt-4 space-y-2">
                  {cuento.comments.map((comment, index) => (
                    <li key={index} className="border-b pb-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">{comment.user}:</span> {comment.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

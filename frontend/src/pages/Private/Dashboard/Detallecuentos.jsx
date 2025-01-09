import { useParams } from "react-router-dom";

function DetallesCuento() {
  const { id } = useParams(); // Obtener el ID del cuento desde la URL
  const cuentos = [
    {
      id: 1,
      title: "El Principito",
      image: "https://via.placeholder.com/300?text=El+Principito",
      text: "Texto completo de 'El Principito' que se mostrará aquí.",
    },
    {
      id: 2,
      title: "Alicia en el País de las Maravillas",
      image: "https://via.placeholder.com/300?text=Alicia+en+el+País+de+las+Maravillas",
      text: "Texto completo de 'Alicia en el País de las Maravillas'.",
    },
    {
      id: 3,
      title: "Hansel y Gretel",
      image: "https://via.placeholder.com/300?text=Hansel+y+Gretel",
      text: "Texto completo de 'Hansel y Gretel'.",
    },
  ];

  // Encontrar el cuento correspondiente al ID
  const cuento = cuentos.find((c) => c.id === parseInt(id));

  if (!cuento) {
    return <h1>Cuento no encontrado</h1>;
  }

  return (
    <div className="bg-gray-100 w-full p-12 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] rounded-lg shadow-2xl border-t-2 border-blue-200">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <img
          src={cuento.image}
          alt={cuento.title}
          className="h-64 w-full object-cover rounded-md mb-4"
        />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {cuento.title}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">{cuento.text}</p>
      </div>
    </div>
  );
}

export default DetallesCuento;

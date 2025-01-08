
function Dashboard() {
  return (
    <div className="bg-gray-100 w-full p-12 bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] rounded-lg shadow-2xl border-t-2 border-blue-200">
      <header className="border-b-2 border-blue-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">Información sobre IA</h2>
            <p className="text-center text-gray-600 mt-4">Aquí puedes encontrar información relevante sobre Inteligencia Artificial.</p>
            <ul className="mt-6">
              <li className="text-gray-700">La Inteligencia Artificial es un campo de estudio que se enfoca en desarrollar sistemas capaces de realizar tareas que requieren inteligencia humana.</li>
              <li className="text-gray-700">Existen diferentes enfoques dentro de la Inteligencia Artificial, como el aprendizaje automático (machine learning) y el procesamiento del lenguaje natural (NLP).</li>
              <li className="text-gray-700">La IA tiene aplicaciones en diversos sectores, como la medicina, la industria, la robótica y los servicios financieros.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800">Noticias de IA</h2>
            <p className="text-center text-gray-600 mt-4">Mantente al día con las últimas noticias y avances en el campo de la Inteligencia Artificial.</p>
            <ul className="mt-6">
              <li className="text-gray-700">Investigadores desarrollan un nuevo algoritmo de aprendizaje automático que mejora la precisión de las predicciones en un 20%.</li>
              <li className="text-gray-700">Una empresa de tecnología anuncia el lanzamiento de un asistente virtual basado en IA que puede realizar tareas complejas de manera más eficiente.</li>
              <li className="text-gray-700">Se descubre un nuevo enfoque en el procesamiento del lenguaje natural que permite una traducción más precisa y fluida entre diferentes idiomas.</li>
            </ul>
          </div>


          {/* Agrega más componentes de información y noticias aquí */}

        </div>
      </main>
    </div>
  )
}

export default Dashboard
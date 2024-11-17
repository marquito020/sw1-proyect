import { Link } from 'react-router-dom';
import IAImage from '../../assets/ia-image.jpeg';
import IAImage2 from '../../assets/ia-image2.jpg';
import Libro from '../../assets/libro.png';
import Mago from '../../assets/mago.png';
import Castillo from '../../assets/castillo.png';
import Book from '../../assets/icon-book.png';
import Footer from '../../components/Footer';

const LandingPage = () => {
    return (
        <div className="bg-gray-100  to-[#a6c1ee]">
            <nav className="bg-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <img className="hidden h-8 w-auto lg:block" src={Book} alt="Your Company" />
                        </Link>
                        <div className="ml-4 text-gray-800 font-semibold text-lg">CuentaCuentos</div>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/login" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                        <Link to="/register" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                    </div>
                </div>
            </nav>
            <header className="bg-white py-10 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800">Bienvenido a CuentaCuentos</h1>
                    <p className="mt-2 text-xl text-center text-gray-600">Descubre las Inteligencias Artificiales que generan cuentos, historias y más</p>
                </div>
            </header>



            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <img className="w-40 mx-auto mb-6" src={IAImage} alt="Inteligencia Artificial" />
                        <h2 className="text-2xl font-bold text-center text-gray-800">Genera Cuento</h2>
                        <p className="text-center text-gray-600 mt-4">Nuestra Inteligencia Artificial te permite generar cuentos fascinantes con solo unos clics. ¡Crea historias únicas y cautivadoras de manera rápida y sencilla!</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <img className="w-40 mx-auto mb-6" src={IAImage2} alt="Inteligencia Artificial" />
                        <h2 className="text-2xl font-bold text-center text-gray-800">Genera Historias</h2>
                        <p className="text-center text-gray-600 mt-4">Explora un mundo de posibilidades con nuestra Inteligencia Artificial. Crea historias emocionantes y deslumbrantes que capturarán la imaginación de tus lectores.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-8">
                        <img className="w-40 mx-auto mb-6" src={IAImage} alt="Inteligencia Artificial" />
                        <h2 className="text-2xl font-bold text-center text-gray-800">Genera Poesía</h2>
                        <p className="text-center text-gray-600 mt-4">Deja que nuestra Inteligencia Artificial te inspire y te ayude a crear poesía maravillosa. Descubre nuevas formas de expresión y déjate llevar por la belleza de las palabras.</p>
                    </div>
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Planes de Pago</h2>
                    <p className="text-center text-gray-600 mt-4">Elige el plan que mejor se adapte a tus necesidades</p>

                    <div className="w-full py-[5rem] px-4 bg-white">
                        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                            <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                                <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Libro} alt="/" />
                                <h2 className="text-2xl font-bold text-center py-8">CuentaCuentos</h2>
                                <p className="text-center text-4xl font-bold">$0</p>
                                <div className="text-center font-medium">
                                    <p className="py-2 border-b mx-8 mt-8 font-bold">Genera Cuento</p>
                                    <p className="py-2 border-b mx-8">Genera Imagen <span className="text-red-500">x</span></p>
                                    <p className="py-2 border-b mx-8">Selecciona Idioma <span className="text-red-500">x</span></p>
                                    <p className="py-2 border-b mx-8">Selecciona Narrador <span className="text-red-500">x</span></p>
                                    <p className="py-2 border-b mx-8">Editar Cuento <span className="text-red-500">x</span></p>
                                    <p className="py-2 border-b mx-8">Exportar Cuento <span className="text-red-500">x</span></p>
                                </div>
                                <Link to="/register" className="text-center bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
                                    Start Trial
                                </Link>
                            </div>
                            <div className="w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
                                <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={Mago} alt="/" />
                                <h2 className="text-2xl font-bold text-center py-8">Narrador</h2>
                                <p className="text-center text-4xl font-bold">$30</p>
                                <div className="text-center font-medium">
                                    <p className="py-2 border-b mx-8 mt-8 font-bold">Genera Cuento</p>
                                    <p className="py-2 border-b mx-8 font-bold">Genera Imagen</p>
                                    <p className="py-2 border-b mx-8 font-bold">Selecciona Idioma</p>
                                    <p className="py-2 border-b mx-8 font-bold">Selecciona Narrador</p>
                                    <p className="py-2 border-b mx-8 font-bold">Editar Cuento</p>
                                    <p className="py-2 border-b mx-8 font-bold">Exportar Cuento</p>
                                </div>
                                <Link to="/register" className="text-center bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
                                    Start Trial
                                </Link>
                            </div>
                            <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                                <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Castillo} alt="/" />
                                <h2 className="text-2xl font-bold text-center py-8">Políglota</h2>
                                <p className="text-center text-4xl font-bold">$15</p>
                                <div className="text-center font-medium">
                                    <p className="py-2 border-b mx-8 mt-8 font-bold">Genera Cuento</p>
                                    <p className="py-2 border-b mx-8 font-bold">Genera Imagen</p>
                                    <p className="py-2 border-b mx-8 font-bold">Selecciona Idioma</p>
                                    <p className="py-2 border-b mx-8">Selecciona Narrador <span className="text-red-500">x</span></p>
                                    <p className="py-2 border-b mx-8">Editar Cuento <span className="text-red-500">x</span></p>
                                    <p className="py-2 border-b mx-8">Exportar Cuento <span className="text-red-500">x</span></p>
                                </div>
                                <Link to="/register" className="text-center bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
                                    Start Trial
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;

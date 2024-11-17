import React from "react";
import { Link } from "react-router-dom";
import { Cards } from "./Cards";

const BuyPage = () => {

    return (
        <div className="min-h-screen ">
            {/* <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
                        </div>
                        <div className="flex">
                            <a
                                href="/"
                                className="text-gray-800 hover:text-gray-600 px-4 py-2"
                            >
                                Inicio
                            </a>
                            <a
                                href="/register"
                                className="text-gray-800 hover:text-gray-600 px-4 py-2"
                            >
                                Register
                            </a>
                            <a
                                href="/login"
                                className="text-gray-800 hover:text-gray-600 px-4 py-2"
                            >
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </nav> */}
            {/* <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold mb-8">Seleccione una Suscripción</h1>
                <div className="grid grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded shadow">
                        <h2 className="text-2xl font-bold mb-4">Free</h2>
                        <p>Acceso a funciones básicas</p>
                        <br />
                        <Link to="/login" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Crear Cuento
                        </Link>
                    </div>
                    <div className="bg-yellow-200 p-8 rounded shadow">
                        <h2 className="text-2xl font-bold mb-4">CuentaCuentos</h2>
                        <p>Acceso a funciones avanzadas de narración</p>
                        <br />
                        <Link to="/buy/1" className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                            Comprar
                        </Link>
                    </div>
                    <div className="bg-green-200 p-8 rounded shadow">
                        <h2 className="text-2xl font-bold mb-4">Educador</h2>
                        <p>Acceso a recursos educativos</p>
                        <br />
                        <Link to="/buy/2" className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Comprar
                        </Link>
                    </div>
                </div>
            </div> */}
            <Cards />
        </div>
    );
};

export default BuyPage;

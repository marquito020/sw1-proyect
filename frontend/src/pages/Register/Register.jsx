import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { PublicRoutes } from "../../constants/routes";
import { useRegister } from "../../hooks/useAuth.hook";

import { PrivateRoutes } from "../../constants/routes";

function Register() {
  const navigate = useNavigate();
  const { registerUser } = useRegister();

  const [messageError, setMessageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(PrivateRoutes.PRIVATE, { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const name = elements.name.value;
    const email = elements.email.value;
    const password = elements.password.value;

    setIsLoading(true);
    try {
      const response = await registerUser({ name, email, password });
      if (response?.id) {
        setMessageError("");
        navigate(PublicRoutes.LOGIN, { replace: true });
      } else if (response && "message" in response) {
        setMessageError(response.message);
      }
      // console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="bg-white w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-black">Registro</h1>
            <p className="text-gray-400 text-sm">
              Ingresa los datos solicitados
            </p>
            <p className="text-red-500">{messageError}</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="name"
                className="bg-white w-full border border-gray-300 py-2 px-10 rounded-md outline-none"
                placeholder="Nombre completo"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                className="bg-white w-full border border-gray-300 py-2 px-10 rounded-md outline-none"
                placeholder="Correo electrónico"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                className="bg-white w-full border border-gray-300 py-2 px-10 rounded-md outline-none"
                placeholder="Contraseña"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
              >
                {isLoading ? "Cargando..." : "Registrarse"}
              </button>
            </div>
          </form>
        </div>
        <span className="flex items-center justify-center gap-2 text-gray-600">
          <Link className="text-blue-500" to={"/login"}>
            Iniciar sesión
          </Link>
        </span>
      </div>
    </div>
  );

}

export default Register;

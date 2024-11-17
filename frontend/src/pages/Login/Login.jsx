import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { PrivateRoutes } from "../../constants/routes";

import { createUser } from "../../redux/states/user.state";
import { useLogin } from "../../hooks/useAuth.hook";
import Book from '../../assets/icon-book.png';

function Login() {
  const dispatch = useDispatch();
  const { loginUser } = useLogin();
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(PrivateRoutes.PRIVATE, { replace: true });
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const email = elements.email.value;
    const password = elements.password.value;

    try {
      const response = await loginUser({ email, password });
      if (response?.token) {
        setMessageError("");
        dispatch(createUser(response));
        navigate(PrivateRoutes.PRIVATE, { replace: true });
      } else if (response && "message" in response) {
        setMessageError(response.message);
      }
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
                            <img
                                className="hidden h-8 w-auto lg:block"
                                src={Book}
                                alt="Your Company"
                            />
                        </Link>
            </div>
            <div className="flex">
              <Link
                to="/register"
                className="text-gray-800 hover:text-gray-600 px-4 py-2"
              >
                Register
              </Link>
              <Link
                to="/buy"
                className="text-gray-800 hover:text-gray-600 px-4 py-2"
              >
                Planes
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-white text-gray-700 flex items-center justify-center p-4">
        <div className="max-w-lg">
          <div className="flex justify-center mb-8">
            <a href="https://www.freepnglogos.com/pics/book" title="Image from freepnglogos.com">
              <img src="https://www.freepnglogos.com/uploads/book-png/big-open-book-outline-transparent-34.png" width="200" alt="big open book outline transparent" />
            </a>
          </div>
          <div className="bg-white w-full rounded-lg p-8 mb-8">
            <div className="flex flex-col items-center gap-1 mb-8">
              <h1 className="text-xl text-black">Login</h1>
              <p className="text-gray-700 text-sm">
                Ingresa tu correo electrónico y contraseña
              </p>
              <p className="text-red-500">{messageError}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-white w-full border border-gray-300 py-2 px-10 rounded-md outline-none"
                  placeholder="Correo electrónico"
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
                  type="submit"
                  className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
                >
                  {"Iniciar sesión"}
                </button>
              </div>
            </form>
          </div>
          <span className="flex items-center justify-center gap-2 text-gray-600">
            <Link className="text-blue-500" to={"/register"}>
              Crear una cuenta
            </Link>
          </span>
        </div>
      </div>
    </div>
  );

}

export default Login;

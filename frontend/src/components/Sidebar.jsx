import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import {
  RiMenuFill,
  RiCloseLine,
  RiLogoutCircleLine,
  RiUserLine,
  RiAddLine,
  RiEditBoxLine,
} from "react-icons/ri";
import { resetUser } from "../redux/states/user.state";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    // console.log("click");
    setShowMenu(!showMenu);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 w-3/4 xl:left-0 md:w-64 h-full bg-white p-8 flex flex-col justify-between z-50 transition-all 
        ${showMenu ? "left-0" : "-left-full"}`}
      >
        {/* Navegacion  */}
        <div>
          <h1 className="text-2xl text-center text-black uppercase font-bold mb-2">
            Software Project
          </h1>
          <p className="text-gray-500 text-center mb-8">User: {user.email}</p>
          <ul>
            <li>
              <NavLink
                to="/private/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-800 text-white"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-800 hover:text-white transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiAddLine />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/private/users"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-800 text-white"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-800 hover:text-white transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiUserLine />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/private/cuento/editar"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-800 text-white"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-800 hover:text-white transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiEditBoxLine />
                Editar Cuento
              </NavLink>
            </li>
            {/* Crear cuento */}
            <li>
              <NavLink
                to="/private/cuento/crear"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-800 text-white"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-800 hover:text-white transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiAddLine />
                Crear Cuento
              </NavLink>
            </li>
            {/* Mis Cuentos */}
            <li>
              <NavLink
                to="/private/cuento/mis-cuentos"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-gray-800 text-white"
                    : "flex items-center mb-1 gap-4 hover:bg-gray-800 hover:text-white transition-colors py-2 px-4 rounded-lg"
                }
              >
                <RiAddLine />
                Mis Cuentos
              </NavLink>
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            dispatch(resetUser());
            navigate("/login", { replace: true });
          }}
          className="
            flex items-center mb-1 gap-4 hover:bg-gray-800 hover:text-white transition-colors py-2 px-4 rounded-lg"
        >
          <RiLogoutCircleLine />
          <div>
            <h5 className="font-medium">Cerrar sesión</h5>
          </div>
        </button>
      </div>

      {/* Btn menu movil */}
      <button
        onClick={toggleMenu}
        className="xl:hidden fixed bottom-6 right-6 bg-gray-800 ring-1 ring-white p-4 rounded-full"
      >
        {showMenu ? <RiCloseLine /> : <RiMenuFill />}
      </button>
    </>
  );

}

export default Sidebar;

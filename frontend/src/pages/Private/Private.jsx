import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoutes } from "../../constants/routes";
import MainContent from "../../components/MainContent";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Users = lazy(() => import("./Users/Users"));
import  EditarCuento from "./Cuentos/EditarCuento";
import CrearCuento from "./Cuentos/CrearCuento";
import ListaCuento from "./Cuentos/ListaCuento";
import VerCuento from "./Cuentos/VerCuento";
import BuyPage from "../Buy/Buy";
import BuyingPage from "../Buy/Buying";

function Private() {
  return (
    <Routes>
      <Route element={<MainContent />}>
        <Route
          path="/"
          element={
            <Navigate
              to={`${PrivateRoutes.PRIVATE}${PrivateRoutes.DASHBOARD}`}
              replace={true}
            />
          }
        />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={PrivateRoutes.USERS} element={<Users />} />
        <Route path={PrivateRoutes.CREARCUENTO} element={<CrearCuento />} />
        <Route path={PrivateRoutes.EDITARCUENTO} element={<EditarCuento />} />
        <Route path={PrivateRoutes.MISCUENTOS} element={<ListaCuento />} />
        <Route path={PrivateRoutes.PLANES} element={<BuyPage />} />
        <Route path={PrivateRoutes.BUY} element={<BuyingPage />} />
        {/* Ver cuento */}
        <Route path={`${PrivateRoutes.CUENTO}`} element={<VerCuento />} />
      </Route>
      <Route path="*" element={<div>PAGE NOT FOUNT</div>} />
    </Routes>
  );
}

export default Private;

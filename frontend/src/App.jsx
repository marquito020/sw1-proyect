import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import { store } from "./redux/store";
import { PrivateRoutes } from "./constants/routes";

import Authenticate from "./guards/Authenticate";
import Loading from "./pages/Loading/Loading";
import LandingPage from "./pages/landing/Landing";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
  return (
    <SWRConfig value={{ suspense: true, revalidateOnFocus: false }}>
      <Suspense fallback={<Loading />}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />}/>
              
              <Route element={<Authenticate />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route path="*" element={<>PAGE NOT FOUNT XD</>} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </SWRConfig>
  );
}

export default App;

export const PublicRoutes = {
  LANDING: "/landing",
  REGISTER: "/register",
  LOGIN: "/login",
};

export const PrivateRoutes = {
  PRIVATE: "/private",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  CREARCUENTO: "/cuento/crear",
  EDITARCUENTO: "/cuento/editar/:id",
  MISCUENTOS: "/cuento/mis-cuentos",
  CUENTO: "/cuento/:id",
  AUDIO: "/cuento/audio",
  BUY: "/buying/:id",
  PLANES: "/buy"
};

export const BASE_URL = import.meta.env.VITE_API_URL;


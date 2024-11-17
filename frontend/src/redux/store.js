import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import userReducer from "../redux/states/user.state";
import documentReducer from "../redux/states/document.state";

export const store = configureStore({
  reducer: {
    user: userReducer,
    document: documentReducer,
  },
});

setupListeners(store.dispatch);

import { createSlice } from "@reduxjs/toolkit";

const EmptyUserState = {
  id: "",
  name: "",
  email: "",
  token: "",
  rol:"",
};

const persistLocalStorageUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearLocalStorageUser = () => {
  localStorage.removeItem("user");
};

const userSlice = createSlice({
  name: "user",
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : EmptyUserState,
  reducers: {
    createUser: (state, action) => {
      persistLocalStorageUser(action.payload);
      return action.payload;
    },
    resetUser: (state) => {
      clearLocalStorageUser();
      return EmptyUserState;
    },
  },
});

export const { createUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

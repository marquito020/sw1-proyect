import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: "document",
  initialState: {
    content: `
               `,
  },
  reducers: {
    saveDocument: (state, action) => {
      state.content = action.payload;
      localStorage.setItem("document", action.payload);
    },

    loadDocument: (state) => {
      state.content = localStorage.getItem("document");
    },

    nuevoDocument: (state) => {
      state.content = "";
    },
  },
});

export const { saveDocument, loadDocument, nuevoDocument } =
  documentSlice.actions;

export default documentSlice.reducer;

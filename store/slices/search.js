import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
  },
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});

export const { setTerm } = searchSlice.actions;

export default searchSlice.reducer;

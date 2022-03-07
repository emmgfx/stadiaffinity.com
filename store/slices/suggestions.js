import { createSlice } from "@reduxjs/toolkit";

export const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {
    updating: false,
    suggestions: [],
  },
  reducers: {
    setUpdating: (state, action) => {
      console.log("setUpdating", action.payload);
      state.updating = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
  },
});

export const { setUpdating, setSuggestions } = suggestionsSlice.actions;

export default suggestionsSlice.reducer;

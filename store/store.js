import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./slices/search";
import suggestionsReducer from "./slices/suggestions";

export default configureStore({
  reducer: {
    search: searchReducer,
    suggestions: suggestionsReducer,
  },
});

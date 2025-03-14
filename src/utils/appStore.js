import { configureStore } from "@reduxjs/toolkit";
import gptReducer from "./gptSlice";
import moviesReducer from "./moviesSlice";
import userReducer from "./userSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;

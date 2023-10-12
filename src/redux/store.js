import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "./reducers/signupReducer";
import { loginReducer } from "./reducers/loginReducer";
import { productsReducer } from "./reducers/productsReducer";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

// store
export const store = configureStore({
  reducer: { signupReducer, loginReducer, productsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

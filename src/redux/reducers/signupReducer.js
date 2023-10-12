// import firebase
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

// import notification
import Notification from "../../utils/Notification";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupValue: { name: "", email: "", password: "" },
  signinButtonDisable: false,
};

export const handleSignupAsync = createAsyncThunk(
  "signup/setSigninButtonDisable",
  (args, thunkAPI) => {
    if (args.name && args.email && args.password) {
      thunkAPI.dispatch(actions.setSigninButtonDisable(true));
      // firebase code
      createUserWithEmailAndPassword(auth, args.email, args.password)
        .then(async (data) => {
          // sign up successful
          Notification("Sign up successfully", false);
          const user = data.user;

          // create empty product and orders of this user in firebase
          await setDoc(doc(db, "usersCarts", user.uid), {
            products: [],
          });
          await setDoc(doc(db, "usersOrders", user.uid), {
            orders: [],
          });

          // update user displayName to name provided by user
          await updateProfile(user, {
            displayName: initialState.signupValue.name,
          });
          thunkAPI.dispatch(actions.setSigninButtonDisable(false));
          // navigate("/");
        })
        .catch((error) => {
          thunkAPI.dispatch(actions.setSigninButtonDisable(false));

          Notification(error.code, true);
        });
    } else {
      Notification("Please fill all fields", true);
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: initialState,
  reducers: {
    setSignupName(state, action) {
      state.signupValue.name = action.payload;
    },
    setSignupEmail(state, action) {
      state.signupValue.email = action.payload;
    },
    setSignupPassword(state, action) {
      state.signupValue.password = action.payload;
    },
    setSigninButtonDisable(state, action) {
      state.signinButtonDisable = action.payload;
    },
  },
});

export const signupReducer = signupSlice.reducer;
export const actions = signupSlice.actions;
export const signupSelector = (state) => state.signupReducer;

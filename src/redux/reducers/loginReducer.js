// import firebase
import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
// import functions form redux toolkit library
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import notification function
import Notification from "../../utils/Notification";

// state
const initialState = {
  loginValue: { email: "", password: "" },
  loginButtonDisable: false,
};

// this function help in login user
export const handleLoginAsync = createAsyncThunk(
  "login/handleLogin",
  (args, thunkAPI) => {
    if (args.email && args.password) {
      thunkAPI.dispatch(actions.setLogininButtonDisable(true));
      // firebase code
      return signInWithEmailAndPassword(auth, args.email, args.password)
        .then(() => {
          return;
        })
        .catch((error) => {
          return thunkAPI.rejectWithValue(error.code.slice(5));
        });
    } else {
      const promise = new Promise((resolve, reject) => {
        resolve(true);
      });
      return promise;
    }
  }
);

// this function reset password
export const resetPassword = createAsyncThunk(
  "login/resetPassword",
  async (email, thunkAPI) => {
    if (email || email === undefined) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          Notification("Check your email to reset password");
        })
        .catch((error) => {
          Notification(error.code.slice(5), true);
        });
    } else {
      Notification("Please enter email",true);
    }
  }
);

// slice
const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLoginEmail(state, action) {
      state.loginValue.email = action.payload;
    },
    setLoginPassword(state, action) {
      state.loginValue.password = action.payload;
    },
    setLogininButtonDisable(state, action) {
      state.loginButtonDisable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLoginAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload === true) {
          Notification("Please fill all fields", true);
        } else {
          state.loginButtonDisable = false;
          Notification("Log in successfully");
        }
      })
      .addCase(handleLoginAsync.rejected, (state, action) => {
        state.loginButtonDisable = false;
        Notification(action.payload, true);
      });
  },
});

export const loginReducer = loginSlice.reducer;
export const actions = loginSlice.actions;
export const loginSelector = (state) => state.loginReducer;

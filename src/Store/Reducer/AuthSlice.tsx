import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ForgotPasswordAPI,
  LogInAPI,
  LogOutAPI,
  OTPVerifyAPI,
  resetPasswordAPI,
} from "../../Routes/Service";
import { AlertEnum, SESSION, TOKEN } from "../.././utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";
import { AuthType } from "@/utils/TYPES";

interface SessionData {
  token: string;
  // Add other properties of your session data here
}

interface AuthState {
  token: string;
  session: SessionData | null | string;
  forgotPwd: string;
}

const initialState: AuthState = {
  token: (() => {
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'sessionid') {
          return value;
        }
      }
    }
    return '';
  })(),
  
  
  // `${
  //   (typeof window !== "undefined" && localStorage.getItem(TOKEN)) || ""
  // }`,
  session: `${
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("SESSION") || "{}")
  }`,
  forgotPwd: "",
};

export const LogIn = createAsyncThunk(
  "LogIn",
  async (values: AuthType, { dispatch }) => {
    let updatedValues = {
      username: values?.username,
      password: values?.password,
    };
    try {
      dispatch(setLoading(true));
      const result = await LogInAPI(updatedValues);
      if (result) {
        dispatch(setLoading(false));
        dispatch(
          setSession({
            ...result,
            password: values.password,
            isRememberMe: values?.isRememberMe,
          })
        );
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return error;
    }
  }
);

export const LogOut = createAsyncThunk(
  "LogOut",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await LogOutAPI(values);
      if (result?.success) {
        dispatch(setLoading(false));
        dispatch(setSession(result));
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "ForgotPassword",
  async (
    values: {
      email: string;
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const result = await ForgotPasswordAPI(values);
      if (result) {
        dispatch(setLoading(false));
        // dispatch(setSession(result));
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return error;
    }
  }
);

export const OTPVerify = createAsyncThunk(
  "OTPVerify",
  async (
    values: {
      email: string;
      token: string | number;
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const result = await OTPVerifyAPI(values);
      if (result) {
        dispatch(setLoading(false));
        // dispatch(setSession(result));
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return error;
    }
  }
);

export const ResetPassword = createAsyncThunk(
  "ResetPassword",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await resetPasswordAPI(values);
      if (result) {
        dispatch(setLoading(false));
        dispatch(setSession(result));
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return error;
    }
  }
);

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    removeToken: (state) => {
      
      localStorage.removeItem(TOKEN);
      state.token = "";
      document.cookie = `sessionid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    },
    setSession: (state, action) => {
      state.session = action?.payload;
      state.token = action?.payload?.session_key;
      localStorage.setItem(SESSION, JSON.stringify(action?.payload));
      localStorage.setItem(TOKEN, action?.payload?.session_key);
    },
    removeSession: (state: any) => {
      localStorage.removeItem(SESSION);
      localStorage.removeItem(TOKEN);
      state.session = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotPwd = action.payload.data;
    });
  },
});

export const { setSession, removeSession, removeToken } = AuthSlice.actions;

export default AuthSlice.reducer;

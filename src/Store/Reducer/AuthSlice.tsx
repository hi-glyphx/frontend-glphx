import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Comment out or remove API imports
// import {
//   ForgotPasswordAPI,
//   LogInAPI,
//   LogOutAPI,
//   OTPVerifyAPI,
//   resetPasswordAPI,
// } from "../../Routes/Service";
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
  
  session: `${
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("SESSION") || "{}")
  }`,
  forgotPwd: "",
};

// Mock response data for demos
const mockResponses = {
  login: {
    success: true,
    session_key: "demo_session_token_12345",
    user: {
      id: 1,
      username: "demouser",
      email: "demo@example.com",
      name: "Demo User"
    }
  },
  logout: {
    success: true,
    message: "Successfully logged out"
  },
  forgotPassword: {
    success: true,
    data: "Password reset email sent",
    message: "Check your email for reset instructions"
  },
  otpVerify: {
    success: true,
    message: "OTP verified successfully"
  },
  resetPassword: {
    success: true,
    message: "Password reset successfully"
  }
};

export const LogIn = createAsyncThunk(
  "LogIn",
  async (values: AuthType, { dispatch }) => {
    let updatedValues = {
      username: values?.username,
      password: values?.password,
    };
    console.log("values", values);
    try {
      dispatch(setLoading(true));
      
      // Mock API response
      // const result = await LogInAPI(updatedValues);
      const result = mockResponses.login;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
        throw new Error("Login failed");
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
      // const result = await LogOutAPI(values);
      const result = mockResponses.logout;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (result?.success) {
        dispatch(setLoading(false));
        dispatch(setSession(result));
        return result;
      } else {
        throw new Error("Logout failed");
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return error;
    }
  }
);

export const forgotPassword = createAsyncThunk<
  { data: string }, // Define the expected payload type
  { email: string } // Define the input type
>(
  "ForgotPassword",
  async (
    values: { email: string },
    { dispatch, rejectWithValue }
  ): Promise<{ data: string } | ReturnType<typeof rejectWithValue>> => {
    try {
      dispatch(setLoading(true));
      // const result = await ForgotPasswordAPI(values);
      const result = mockResponses.forgotPassword;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (result?.success) {
        dispatch(setLoading(false));
        return { data: result.data };
      } else {
        throw new Error("Password reset request failed");
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return rejectWithValue(errorMessage);
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
      // const result = await OTPVerifyAPI(values);
      const result = mockResponses.otpVerify;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (result) {
        dispatch(setLoading(false));
        return result;
      } else {
        throw new Error("OTP verification failed");
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
      // const result = await resetPasswordAPI(values);
      const result = mockResponses.resetPassword;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (result) {
        dispatch(setLoading(false));
        dispatch(setSession(result));
        return result;
      } else {
        throw new Error("Password reset failed");
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
      state.forgotPwd = (action.payload as { data: string }).data;
    });
  },
});

export const { setSession, removeSession, removeToken } = AuthSlice.actions;

export default AuthSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  SelectGroupsAPI,
  SelectTeamAPI,
  UpdateUserAPI,
  UserListAPI,
  deleteUserAPI,
  createUserApi,
} from "../../Routes/Service";
import { AlertEnum } from "../.././utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";
import {
  SelectGroupsData,
  SelectTeamData,
  UserListData,
} from "@/shared/config/types";

type PROPS = {
  selectTeam: SelectTeamData;
  selectGroups: any;
  userList: UserListData;
};

const initialState: PROPS = {
  selectTeam: {
    items: [
      {
        name: "",
        id: "",
      },
    ],
    meta: {
      offset: 0,
      limit: 0,
      total_count: 0,
      success: false,
    },
  },
  selectGroups: [],
  userList: {
    items: [],
    meta: {
      offset: 0,
      limit: 0,
      total_count: 0,
      success: false,
    },
  },
};

export const createUser = createAsyncThunk(
  "createUser",
  async (values: {
    email?: string;
    username?: string;
    teams?: [];
    groups?: string[];
    password?: string;
    team_type?:string
    group_type?:string
}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await createUserApi(values);
      dispatch(setLoading(false));

      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      throw error;
    }
  }
);

export const SelectGroups = createAsyncThunk(
  "SelectGroups",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SelectGroupsAPI(values);
      if (result) {
        dispatch(setLoading(false));
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

export const UserList = createAsyncThunk(
  "UserList",
  async (values:string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await UserListAPI(values);
      if (result) {
        dispatch(setLoading(false));
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

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (values:string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await deleteUserAPI(values);
      if (result) {
        dispatch(setLoading(false));
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

export const UpdateUser = createAsyncThunk(
  "UpdateUser",
  async (values:{
    data: {
      is_active: boolean;
    };
    id?: number | string;
  }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await UpdateUserAPI(values);
      if (result) {
        dispatch(setLoading(false));
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

export const SelectTeam = createAsyncThunk(
  "SelectTeam",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SelectTeamAPI(values);
      if (result) {
        dispatch(setLoading(false));
        return result;
      }
    } catch (error: unknown) {
      dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      throw error;
    }
  }
);

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(SelectTeam.fulfilled, (state, action) => {
      state.selectTeam = action.payload;
    });

    builder.addCase(SelectGroups.fulfilled, (state, action) => {
      state.selectGroups = action.payload;
    });

    builder.addCase(UserList.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export default UserSlice.reducer;
 
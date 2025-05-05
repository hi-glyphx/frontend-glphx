import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  EditListAPI,
  GroupsListAPI,
  UpdateListAPI,
} from "../../Routes/Service";
import { AlertEnum } from "../.././utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";
import { GroupslistData } from "@/shared/config/types";

type PROPS = {
  groupslist: GroupslistData;
  editList: any;
  updateList: any[];
};

const initialState: PROPS = {
  groupslist: {
    items: [],
    meta: {
      offset: 0,
      limit: 0,
      total_count: 0,
    },
  },
  editList: {
    permissions: [],
  },
  updateList: [],
};

export const Groupslist = createAsyncThunk(
  "Groupslist",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await GroupsListAPI(values);
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

export const EditList = createAsyncThunk(
  "EditList",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await EditListAPI(values);
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

export const UpdateList = createAsyncThunk(
  "UpdateList",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await UpdateListAPI(values);
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

export const GroupsSlice = createSlice({
  name: "GroupsSlice",
  initialState,
  reducers: {
    // updateEditList: (state, action) => {
    //   const { rowIndex, columnName, subIndex }: any = action.payload;

    //   if (Array.isArray(state.editList?.permissions[rowIndex]?.methods)) {
    //     const methodsArray = state.editList?.permissions[rowIndex].methods;

    //     if (methodsArray.includes(columnName)) {
    //       const methodsIndex = methodsArray.indexOf(columnName);
    //       if (methodsIndex !== -1) {
    //         methodsArray.splice(methodsIndex, 1, null);
    //       }
    //     } else {
    //       methodsArray[subIndex] = columnName;
    //     }
    //   }
    // },

    updateEditList: (state, action) => {
      const { rowIndex, columnName, subIndex }: any = action.payload;
      if (Array.isArray(state.editList?.permissions[rowIndex]?.methods)) {
        const methodsArray = state.editList?.permissions[rowIndex].methods;

        if (subIndex >= 0 && subIndex < methodsArray.length) {
          if (methodsArray[subIndex] === columnName) {
            methodsArray[subIndex] = null;
          } else {
            methodsArray.splice(subIndex, 1);
            methodsArray.splice(subIndex, 0, columnName);
          }
        } else {
          methodsArray[subIndex] = columnName;
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(Groupslist.fulfilled, (state, action) => {
      state.groupslist = action.payload;
    });
    builder.addCase(EditList.fulfilled, (state, action) => {
      state.editList = action.payload;
    });

    builder.addCase(UpdateList.fulfilled, (state, action) => {
      state.updateList = action.payload;
    });
  },
});
export const { updateEditList } = GroupsSlice.actions;

export default GroupsSlice.reducer;

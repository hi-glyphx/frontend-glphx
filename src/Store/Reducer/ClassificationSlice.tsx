import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ClassificationAPI,
  ClassificationBatchAPI,
  ClassifyAPI,
  DeleteClassificationBatchAPI,
  GetClassificationBatchesAPI,
  SaveClassifyAPI,
  getImageAPI,
  updateClassificationBatchAPI,
} from "../../Routes/Service";
import { AlertEnum } from "../.././utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";

const initialState = {
  classificationList: {
    items: [],
  },
  classify: {
    items: [],
    Created: "",
    Modified: "",
  },
  classificationPreImage: {},
  verifyUrl: "",
  selectedRowName: {},
  indexSelected: 0,
  active_page_num: {},
  document_imageURLID: {},
  classificationBatchesCount: {},
};

export const Classification = createAsyncThunk(
  "Classification",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ClassificationAPI(values);
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

export const Classify = createAsyncThunk(
  "Classify",
  async (values, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await ClassifyAPI();
      if (result) {
        // dispatch(setLoading(false));
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      // dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      return error;
    }
  }
);

export const DeleteClassificationBatch = createAsyncThunk(
  "DeleteClassificationBatch",
  async (
    values: {
      batch_id: any;
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const result = await DeleteClassificationBatchAPI(values);
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

export const updateClassificationBatch = createAsyncThunk(
  "updateClassificationBatch",
  async (
    values: {
      batch_id?: number | string;
      case_id?: string | number;
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const result = await updateClassificationBatchAPI(values);
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

export const getImage = createAsyncThunk(
  "getImage",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await getImageAPI(values);
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
export const SaveClassify = createAsyncThunk(
  "SaveClassify",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SaveClassifyAPI(values);
      if (result) {
        dispatch(GetClassificationBatches());

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

export const ClassificationBatch = createAsyncThunk(
  "ClassificationBatch",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ClassificationBatchAPI(values);
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
export const GetClassificationBatches = createAsyncThunk(
  "GetClassificationBatches",
  async (value, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await GetClassificationBatchesAPI();
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
export const ClassificationSlice = createSlice({
  name: "ClassificationSlice",
  initialState,
  reducers: {
    verifyUrl: (state, action) => {
      state.verifyUrl = action.payload;
    },

    setSelctedPage: (state: any, action: any) => {
      state.active_page_num = action.payload;
    },
    setSelectedRowName: (state: any, action: any) => {
      let updatedArray =
        action.payload.oldArray &&
        action.payload.oldArray.map((item) => {
          if (item.page_name === action.payload.selected) {
            return {
              ...item,
              document_name: action.payload.value,
              confidence_status: true,
              isEdit: true,
            };
          }
          return item;
        });

      const newState = {
        ...state,
        selectedRowName: action.payload.value,

        classify: {
          ...state.classify,
          items: [
            {
              ...state.classify?.items[0],
              results: updatedArray,
            },
            ...state.classify?.items.slice(1),
          ],
        },
      };

      return newState;
    },

    setIndex: (state, action) => {
      state.indexSelected = action.payload;
    },
    setDocument_imageURLID: (state, action) => {
      state.document_imageURLID = {
        [action.payload.id]: action.payload.url,
      };
    },

    setClearClassify: (state) => {
      state.classify = {
        items: [],
        Created: "",
        Modified: "",
      };
    },

    setCreatedDate: (state, action) => {
      const createdDate = new Date(action.payload);
      state.classify.Created = createdDate.toISOString(); // Convert back to ISO string format
    },
    setRemoveZeroIndex: (state) => {
      // Ensure that classify object and its items array exist
      if (
        state.classify &&
        Array.isArray(state.classify.items) &&
        state.classify.items.length > 0
      ) {
        const { items, ...classifyWithoutItems } = state.classify; // Destructure items array and rest of the classify object
        const newItemsArray = items.slice(1); // Create a new array excluding the first element

        // Create a new state object with the updated items array within the classify object
        return {
          ...state,
          classify: {
            ...classifyWithoutItems,
            items: newItemsArray,
          },
        };
      }
      // Return the unchanged state if the condition isn't met
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(Classification.fulfilled, (state, action) => {
      state.classificationList = action.payload;
    });
    // builder.addCase(Classify.fulfilled, (state, action) => {
    //   let updatedResults = action?.payload?.items &&   action?.payload?.items[0]?.results?.map((result) => ({
    //     ...result,
    //     ForceClassify: false,
    //     DoClassify: false,
    //     ID: `${result?.form_id}-${result?.page_name}`,
    //   }));

    //   state.classify = {
    //     ...action?.payload,
    //     items: [
    //       {
    //         ...action?.payload?.items[0],
    //         results: updatedResults,
    //       },
    //       ...action.payload.items.slice(1), // Keep the rest of the items unchanged
    //     ],
    //   };
    // });
    builder.addCase(Classify.fulfilled, (state, action) => {
      let updatedResults =
        action?.payload?.items &&
        action?.payload?.items[0]?.results?.map((result) => ({
          ...result,
          ForceClassify: false,
          DoClassify: false,
          ID: `${result?.form_id}-${result?.page_name}`,
        }));

      state.classify = {
        ...action?.payload,
        items: [
          {
            ...action?.payload?.items?.[0],
            results: updatedResults,
          },
          ...(action?.payload?.items ? action.payload.items.slice(1) : []), // Keep the rest of the items unchanged if available
        ],
      };
    });

    builder.addCase(getImage.fulfilled, (state, action) => {
      state.classificationPreImage = action.payload;
    });
    builder.addCase(GetClassificationBatches.fulfilled, (state, action) => {
      state.classificationBatchesCount = action.payload;
    });
  },
});

export const {
  verifyUrl,
  setSelectedRowName,
  setIndex,
  setCreatedDate,
  setSelctedPage,
  setRemoveZeroIndex,
  setClearClassify,
  setDocument_imageURLID,
} = ClassificationSlice.actions;

export default ClassificationSlice.reducer;

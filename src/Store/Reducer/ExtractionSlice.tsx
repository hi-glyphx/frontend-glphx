import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DeleteExtractionBatchAPI,
  VerificationAPI,
  VerifyApi,
  ExpiresVerificationAPI,
  VerificationResultsAPI,
  VerificationSaveChangesAPI,
  DynamicFieldValidationAPI,
  GetCheckboxesAPI,
  SaveCheckboxesAPI,
  ExpireVerificationBatchAPI,
  DeleteclassificationBatchAPI,
  DeleteVerifyExtractionBatchAPI,
} from "../../Routes/Service";
import { AlertEnum } from "../.././utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";
import {
  CheckboxesDetailData,
  ExtractionVerify,
  ExtractionistData,
} from "@/shared/config/types";
import { GetClassificationBatches } from "./ClassificationSlice";

type PROPS = {
  extractionBatchList: ExtractionistData;
  extractionVerifyList: ExtractionVerify;
  // verificationResultsDetail: any;
  checkboxesDetail: CheckboxesDetailData;
};

const initialState: PROPS = {
  extractionBatchList: {
    items: [],
    meta: {
      offset: 0,
      limit: 0,
      total_count: 0,
      total_pages: 0,
      total_items: 0,
      current_page: "",
      total_batches_ready: 0,
      total_batches_pending: 0,
    },
  },
  extractionVerifyList: {
    data: {},

    meta: {
      count: 0,
      batch_id: "",
      manual: false,
      case_num: "",
      page_ids: [],
      document_link: "",
      type: "",
    },
    field_order: [],
  },
  // verificationResultsDetail: {},
  checkboxesDetail: {
    meta: {
      count: 0,
      batch_id: "54f0e3e3026f4c229d4392097d559af4",
    },
    data: {},
  },
};

export const Verification = createAsyncThunk(
  "Verification",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await VerificationAPI(values);
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
export const expiresVerification = createAsyncThunk(
  "expiresVerification",
  async (
    values: {
      batch_id?: number | string;
      // case_id?:string | number ,
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const result = await ExpiresVerificationAPI(values);
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
export const Verify = createAsyncThunk(
  "Verify",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await VerifyApi(values);
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

// export const verificationResults = createAsyncThunk(
//   "verificationResults",
//   async (values, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       const result = await VerificationResultsAPI(values);
//       if (result) {
//         dispatch(setLoading(false));
//         return result;
//       } else {
//         throw result;
//       }
//     } catch (error: unknown) {
//       dispatch(setLoading(false));
//       dispatch(
//         setMessage({
//           text: error?.message,
//           type: AlertEnum.Error,
//         })
//       );
//       return error;
//     }
//   }
// );

export const verificationSaveChanges = createAsyncThunk(
  "verificationSaveChanges",
  async (
    values: {
      meta: {
        batch_id?: string;
        post_retry_count: number;
        time_to_verify: number;
      };
      data: Record<string, any>;
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const result = await VerificationSaveChangesAPI(values);
      if (result) {
        dispatch(setLoading(false));
        dispatch(GetClassificationBatches());

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
export const dynamicFieldValidation = createAsyncThunk(
  "dynamicFieldValidation",
  async (values: any, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await DynamicFieldValidationAPI(values);
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
export const DeleteExtractionBatch = createAsyncThunk(
  "DeleteExtractionBatch",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await DeleteExtractionBatchAPI(values);
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

export const DeleteVerifyExtractionBatch = createAsyncThunk(
  "DeleteVerifyExtractionBatch",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await DeleteVerifyExtractionBatchAPI(values);
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
export const DeleteclassificationBatch = createAsyncThunk(
  "DeleteclassificationBatch",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await DeleteclassificationBatchAPI(values);
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

// varify checkboxes list api

export const GetCheckboxes = createAsyncThunk(
  "GetCheckboxes",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await GetCheckboxesAPI();
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

export const SaveCheckboxes = createAsyncThunk(
  "SaveCheckboxes",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await SaveCheckboxesAPI(values);
      if (result) {
        dispatch(setLoading(false));
        dispatch(GetClassificationBatches());
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

export const ExpireVerificationBatch = createAsyncThunk(
  "ExpireVerificationBatch",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ExpireVerificationBatchAPI(values);
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

export const ExtractionSlice = createSlice({
  name: "ExtractionSlice",
  initialState,
  reducers: {
    ClearCheckboxesData: (state: any) => {
      state.checkboxesDetail = "";
    },
    ClearVerifyData: (state: any) => {
      state.extractionVerifyList = {
        data: {},

        meta: {
          count: 0,
          batch_id: "",
          manual: false,
          case_num: "",
          page_ids: [],
          document_link: "",
          type: "",
        },
        field_order: [],
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(Verification.fulfilled, (state, action) => {
      state.extractionBatchList = action.payload;
    });
    builder.addCase(Verify.fulfilled, (state, action) => {
      state.extractionVerifyList = action.payload;
    });
    // builder.addCase(verificationResults.fulfilled, (state, action) => {
    //   state.verificationResultsDetail = action.payload;
    // });
    builder.addCase(GetCheckboxes.fulfilled, (state, action) => {
      state.checkboxesDetail = action.payload;
    });
  },
});

export const { ClearCheckboxesData, ClearVerifyData } = ExtractionSlice.actions;

export default ExtractionSlice.reducer;

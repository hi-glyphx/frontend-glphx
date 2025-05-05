import {
  BasicReportListApi,
  ClassificationReportDeleteApi,
  ClassificationReportDetailApi,
  ClassificationReportUpdateApi,
  ClassificationsReportsApi,
  ExtractionsReportDeleteApi,
  ExtractionsReportDetailApi,
  ExtractionsReportListDownloadAPI,
  ExtractionsReportUpdateApi,
  ExtractionsReportsApi,
  ProcessingReportDeleteApi,
  ProcessingReportDetailApi,
  ProcessingReportListApi,
  ProcessingReportUpdateApi,
  ValidationReportDeleteApi,
  ValidationReportListApi,
  ValidationReportUpdateApi,
  classificationsreportsdownloadApi,
  downloadProcessingApi,
  extractionsCaseListApi,
  extractionsreportsdownloadApi,
} from "@/Routes/Service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AlertEnum } from "../.././utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";
import {
  BasicReportListData,
  ClassificationsReportsListData,
  ExtractionsReportslistData,
  ProcessingReportListData,
  ValidationReportListData,
} from "@/shared/config/types";

type PROPS = {
  basicReportList_v1: BasicReportListData;
  classificationsReports: ClassificationsReportsListData;
  extractionsReports: ExtractionsReportslistData;
  processingReportList: ProcessingReportListData;
  validationReportList: ValidationReportListData;
  processingReportDetail: object;
  classificationreportdetail: Array<any>;
  extractionsreportdetail: Array<any>;
  reportVersionDropdown: number;
  ExtractionsCaseList: Array<any>;
};

const initialState: PROPS = {
  reportVersionDropdown: 0,
  basicReportList_v1: {
    meta: {
      total_pages: 0,
      current_page: 0,
      verification_count: 0,
      completed_count: 0,
      total_forms: 0,
    },
    data: [],
  },
  classificationsReports: {
    meta: {
      total_pages: 0,
      current_page: 0,
      total_reports: 0,
    },
    data: [],
  },
  extractionsReports: {
    meta: {
      total_pages: 0,
      current_page: 0,
      total_reports: 0,
    },
    data: [],
  },
  processingReportList: {
    meta: {
      total_pages: 0,
      current_page: 0,
      total_reports: 0,
    },
    data: [],
  },
  processingReportDetail: {},
  validationReportList: {
    meta: {
      total_pages: 0,
      current_page: 0,
      total_reports: 0,
    },
    data: [],
  },
  classificationreportdetail: [],
  extractionsreportdetail: [],
  ExtractionsCaseList: [],
};

export const BasicReportList = createAsyncThunk(
  "BasicReportList",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await BasicReportListApi(values);
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

export const ProcessingReportList = createAsyncThunk(
  "ProcessingReportList",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ProcessingReportListApi(values);
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

export const ProcessingReportDetail = createAsyncThunk(
  "ProcessingReportDetail",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ProcessingReportDetailApi();
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

export const ProcessingReportUpdate = createAsyncThunk(
  "ProcessingReportUpdate",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ProcessingReportUpdateApi(values);
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

export const ProcessingReportDelete = createAsyncThunk(
  "ProcessingReportDelete",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ProcessingReportDeleteApi(values);
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

export const ClassificationsReports = createAsyncThunk(
  "ClassificationsReports",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ClassificationsReportsApi(values);
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

export const ClassificationReportDetail = createAsyncThunk(
  "ClassificationReportDetail",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ClassificationReportDetailApi();
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
export const ExtractionsReportDetail = createAsyncThunk(
  "ExtractionsReportDetail",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ExtractionsReportDetailApi();
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

export const ExtractionsReports = createAsyncThunk(
  "ExtractionsReports",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ExtractionsReportsApi(values);
      console.log(initialState.extractionsReports)
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

export const ClassificationReportUpdate = createAsyncThunk(
  "ClassificationReportUpdate",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ClassificationReportUpdateApi(values);
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

export const ExtractionsReportUpdate = createAsyncThunk(
  "ExtractionsReportUpdate",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ExtractionsReportUpdateApi(values);
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

export const ClassificationReportDelete = createAsyncThunk(
  "ClassificationReportDelete",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ClassificationReportDeleteApi(values);
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

export const ExtractionsReportDelete = createAsyncThunk(
  "ExtractionsReportDelete",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ExtractionsReportDeleteApi(values);
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

export const ValidationReportList = createAsyncThunk(
  "ValidationReportList",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ValidationReportListApi(values);
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

export const ValidationReportUpdate = createAsyncThunk(
  "ValidationReportUpdate",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ValidationReportUpdateApi(values);
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

export const ValidationReportDelete = createAsyncThunk(
  "ValidationReportDelete",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ValidationReportDeleteApi();
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

export const extractionsCaseList = createAsyncThunk(
  "extractionsCaseList",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await extractionsCaseListApi(values);
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

export const DownloadProcessing = createAsyncThunk(
  "DownloadProcessing",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await downloadProcessingApi();
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

export const classificationsreportsdownload = createAsyncThunk(
  "classificationsreportsdownload",
  async (values:any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await classificationsreportsdownloadApi(values);
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
export const extractionsreportsdownload = createAsyncThunk(
  "extractionsreportsdownload",
  async (values:any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await extractionsreportsdownloadApi(values);
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
export const extractionsReportListDownload = createAsyncThunk(
  "extractionsReportListDownload",
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await ExtractionsReportListDownloadAPI();
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

export const ReportsSlice = createSlice({
  name: "ReportsSlice",
  initialState,
  reducers: {
    setReportVersionDropdown: (state, action) => {
      state.reportVersionDropdown = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(BasicReportList.fulfilled, (state, action) => {
      state.basicReportList_v1 = action.payload;
    });
    builder.addCase(ClassificationsReports.fulfilled, (state, action) => {
      state.classificationsReports = action.payload;
    });
    builder.addCase(ExtractionsReports.fulfilled, (state, action) => {
      state.extractionsReports = action.payload;
    });
    builder.addCase(ProcessingReportList.fulfilled, (state, action) => {
      state.processingReportList = action.payload;
    });
    builder.addCase(ProcessingReportDetail.fulfilled, (state, action) => {
      state.processingReportDetail = action.payload;
    });
    builder.addCase(ValidationReportList.fulfilled, (state, action) => {
      state.validationReportList = action.payload;
    });
    builder.addCase(ClassificationReportDetail.fulfilled, (state, action) => {
      state.classificationreportdetail = action.payload;
    });
    builder.addCase(ExtractionsReportDetail.fulfilled, (state, action) => {
      state.extractionsreportdetail = action.payload;
    });
    builder.addCase(extractionsCaseList.fulfilled, (state, action) => {
      state.ExtractionsCaseList = action.payload;
    });
    builder.addCase(DownloadProcessing.fulfilled, (state, action) => {
    });
  },
});
export const { setReportVersionDropdown } = ReportsSlice.actions;

export default ReportsSlice.reducer;

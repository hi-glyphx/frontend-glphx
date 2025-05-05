import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CaseListAPI,
  CaseDetailAPI,
  deleteCaseAPI,
  MarkAsProcessedAPI,
  caseReprocessApi,
  caseAbortProcessingAPI,
  CaseDownloadReqestApi,
  CaseDownloadApi,
  deleteFormCaseApi,
  FormDownloadApi,
  MarkAsProcessedformAPI,
  caseAbortProcessingFormAPI,
} from "../../Routes/Service";
import { AlertEnum } from "../.././utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";
import {
  createCaseApi,
  createFormApi,
  getAllAliasApi,
  getAllProjectsApi,
  caseFormReprocessApi,
} from "@/Routes/Service";
import {
  CaseDeailData,
  CaseFlagsObject,
  CaseListDataOBJ,
  GetAllAliasList,
  GetAllProjects,
} from "@/shared/config/types";

type PROPS = {
  selectedFiles: Array<any>;
  allProjects: Array<any>; //GetAllProjects;
  allAliases: Array<any>; //GetAllAliasList;
  projectId: string;
  selected: Record<string, string>;
  selectedAliasKey: Record<string, string>;
  selectedAlias: Record<string, { id: string; name: string; alias: string }[]>;
  caseList: CaseListDataOBJ;
  caseDetail: CaseDeailData;
  imageFiles: Array<object>;
  caseFlags: CaseFlagsObject;
  formFlags: Record<
    string,
    {
      keyValuePairs: { key: string; value: string }[];
    }
  >;
  aliasModal: Array<any>;
  isCaseError: object;
  isCaseSuccess: object;
  caseFormFlagsDetail: any;
};

const initialState: PROPS = {
  selectedFiles: [],
  allProjects: [],
  allAliases: [],
  projectId: "",
  selected: {},
  selectedAliasKey: {},
  selectedAlias: {},
  caseList: {
    data: [],
    meta: {
      total_pages: 0,
      current_page: "",
      verification_count: 0,
      classification_count: 0,
      total_cases: 0,
    },
  },
  caseDetail: {
    meta: {},
    data: {
      case_id: "",
      case_num: "",
      team_id: "",
      team: "",
      created: "",
      flags: {
        redis_error: false,
      },
      status: false,
      template_id: "",
      is_processing: false,
      completed: "",
      available_aliases: [],
      documents: [
        {
          form_num: "",
          alias: "",
          processed: false,
          dynamic: false,
          form_id: "",

          has_batch: "No", // Assuming it's either "No" or "Yes"
        },
      ],
      others: {
        jobs: [], // You can define a specific type for jobs if needed
        verification_batches: {
          Ready: [], // Define a specific type if needed
          Sent: [], // Define a specific type if needed
          Received: [], // Define a specific type if needed
        },
        classification_batches: {
          Ready: [], // Define a specific type if needed
          Sent: [], // Define a specific type if needed
          Received: [], // Define a specific type if needed
        },
      },
    },
  },
  imageFiles: [],
  caseFlags: {},
  formFlags: {},
  aliasModal: [],
  isCaseError: {},
  isCaseSuccess: {},
  caseFormFlagsDetail: {},
};

// ** Project dropdown api
export const getAllProjects = createAsyncThunk(
  "getAllProjects",
  async (values, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await getAllProjectsApi(values);
      // dispatch(setLoading(false));
      if (result?.data) {
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      // dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      throw error;
    }
  }
);

// ** Alias Dropdown api
export const getAllAlias = createAsyncThunk(
  "getAllAlias",
  async (values: any, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await getAllAliasApi(values.id);
      // dispatch(setLoading(false));
      dispatch(
        setAlises({
          id: values.project,
          value: result.templates,
        })
      );

      if (result?.success) {
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      // dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      throw error;
    }
  }
);

// ** Create Case Api
export const createCase = createAsyncThunk(
  "createCase",
  async (values: any, { dispatch }) => {
    try {
      // dispatch(setLoading(true));
      const result = await createCaseApi(values);
      // dispatch(setLoading(false));
      if (result?.item?.success) {
        return result;
      } else {
        throw result;
      }
    } catch (error: unknown) {
      // dispatch(setLoading(false));
      const errorMessage = (error as Error)?.message || "An error occurred.";
      dispatch(setMessage({ text: errorMessage, type: AlertEnum.Error }));
      throw error;
    }
  }
);

// ** Create form api
export const createForm = createAsyncThunk(
  "createCase",
  async (values: any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await createFormApi(values);
      dispatch(setLoading(false));
      if (result?.success) {
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

export const caseFormReprocess = createAsyncThunk(
  "caseFormReprocess",
  async (values: { form_id: string | number }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await caseFormReprocessApi(values);
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

export const caseReprocess = createAsyncThunk(
  "caseReprocess",
  async (values: { case_id: string | number }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await caseReprocessApi(values);
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

export const MarkAsProcessed = createAsyncThunk(
  "MarkAsProcessed",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await MarkAsProcessedAPI(values);
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
export const MarkAsProcessedform = createAsyncThunk(
  "MarkAsProcessedform",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await MarkAsProcessedformAPI(values);
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

export const caseAbortProcessing = createAsyncThunk(
  "caseAbortProcessing",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await caseAbortProcessingAPI(values);
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
export const caseAbortProcessingForm = createAsyncThunk(
  "caseAbortProcessingForm",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await caseAbortProcessingFormAPI(values);
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

export const CaseDetailById = createAsyncThunk(
  "CaseDetailById",
  async (values: string | string[] | undefined | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await CaseDetailAPI(values);
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

export const deleteCase = createAsyncThunk(
  "deleteCase",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await deleteCaseAPI(values);
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
      throw error;
    }
  }
);

export const deleteFormCase = createAsyncThunk(
  "deleteFormCase",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await deleteFormCaseApi(values);
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
      throw error;
    }
  }
);

export const CaseList = createAsyncThunk(
  "CaseList",
  async (values: String | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await CaseListAPI(values);
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

export const CaseDownloadReqest = createAsyncThunk(
  "CaseDownloadReqest",
  async (values: { case_id: number | string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await CaseDownloadReqestApi(values);
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

export const CaseDownload = createAsyncThunk(
  "CaseDownload",
  async (values: { case_id: number | string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await CaseDownloadApi(values);
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

export const FormDownload = createAsyncThunk(
  "FormDownload",
  async (values: { form_id: number | string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await FormDownloadApi(values);
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

export const CaseSlice = createSlice({
  name: "CaseSlice",
  initialState,
  reducers: {
    selectFile: (state, action) => {
      state.selectedFiles.push(action.payload);

      if (
        (action.payload instanceof File &&
          action.payload.type.startsWith("image/")) ||
        action.payload.type.startsWith("application/")
      ) {
        state.imageFiles.push(
          window.URL.createObjectURL(action.payload) as any
        );
      }
    },
    clearSelectFile: (state) => {
      state.selectedFiles = [];
      state.imageFiles = [];
    },

    deleteSelectFile: (state, action) => {
      if (action.payload) {
        // Find the index of the item with the specified id
        const indexToDelete = state.selectedFiles.findIndex(
          (item) => item?.id === action.payload
        );

        if (indexToDelete !== -1) {
          // Create a new array without the item at the specified index
          const updatedselectedFiles = [
            ...state.selectedFiles.slice(0, indexToDelete),
            ...state.selectedFiles.slice(indexToDelete + 1),
          ];
          return { ...state, selectedFiles: updatedselectedFiles };
        }
      }
      return state;
    },

    //     deleteSelectFile: (state, action) => {
    //   if (action.payload) {
    //     // Create a new array without the item with the specified id
    //     const updatedselectedFiles = state.selectedFiles.filter((item) => item?.id !== action.payload);
    //     return { ...state, selectedFiles: updatedselectedFiles };
    //   }
    //   return state;
    // },
    // deleteSelectFile: (state, action) => {
    //   state.selectedFiles = []
    // },
    setId: (state, action) => {
      state.projectId = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = {
        ...state.selected,
        [action.payload.id]: action.payload.value,
      };
    },

    setClearSelected: (state) => {
      state.selected = {};
    },
    setSelectedAliasKey: (state, action) => {
      state.selectedAliasKey = {
        ...state.selectedAliasKey,
        [action.payload.id]: action.payload.value,
      };
    },

    setClearSelectedAliasKey: (state) => {
      state.selectedAliasKey = {};
    },
    setAlises: (state, action) => {
      state.selectedAlias = {
        ...state.selectedAlias,
        [action.payload.id]: action.payload.value,
      };
    },
    setCaseFlags: (state, action) => {
      state.caseFlags = {
        ...state.caseFlags,
        [action.payload.id]: action.payload.value,
      };
    },
    setFormFlags: (state, action) => {
      state.formFlags = {
        ...state.formFlags,
        [action.payload.id]: action.payload.value,
      };
    },
    setAliasModal: (state, action) => {
      state.aliasModal.push(action.payload);
    },
    setClearCaseDetail: (state: any, action) => {
      state.caseDetail = action.payload;
    },
    setIsCaseError: (state, action) => {
      state.isCaseError = {
        ...state.isCaseError,
        [action.payload.id]: action.payload.value,
      };
    },

    setClearIsCaseError: (state) => {
      state.isCaseError = {};
    },
    setIsCaseSuccess: (state, action) => {
      state.isCaseSuccess = {
        ...state.isCaseSuccess,
        [action.payload.id]: action.payload.value,
      };
    },

    setClearIsCaseSuccess: (state) => {
      state.isCaseSuccess = {};
    },
    clearAlert: (state, action) => {
      state.isCaseError = action.payload;
      state.isCaseSuccess = action.payload;
    },

    setCaseFormFlagsDetail: (state, action) => {
      state.caseFormFlagsDetail = action.payload;
    },
    clearCaseFormFlagsDetail: (state) => {
      state.caseFormFlagsDetail = "";
    },
    clearCaseList: (state) => {
      state.caseList = {
        data: [],
        meta: {
          total_pages: 0,
          current_page: "",
          verification_count: 0,
          classification_count: 0,
          total_cases: 0,
        },
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.allProjects = action.payload.data;
    });
    builder.addCase(getAllAlias.fulfilled, (state, action) => {
      state.allAliases = action.payload.templates;
    });

    builder.addCase(CaseDetailById.fulfilled, (state, action) => {
      state.caseDetail = action.payload;
    });
    builder.addCase(CaseList.fulfilled, (state, action) => {
      state.caseList = action.payload;
    });
  },
});

export const {
  selectFile,
  setId,
  setSelected,
  setAlises,
  setCaseFlags,
  setFormFlags,
  setAliasModal,
  setSelectedAliasKey,
  setClearCaseDetail,
  clearSelectFile,
  setIsCaseError,
  setIsCaseSuccess,
  clearAlert,
  deleteSelectFile,
  setCaseFormFlagsDetail,
  clearCaseFormFlagsDetail,
  clearCaseList,
  setClearSelectedAliasKey,
  setClearSelected,
  setClearIsCaseError,
  setClearIsCaseSuccess,
} = CaseSlice.actions;

export default CaseSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  confirmTableDetail: {
    isSelecteAll: false,
    tableSelectedData: [],
  },
  paramsData: "?",
  searchParams: {},
  isSidebarOpen: true,
};

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {
    setSelectedData: (state, action) => {
      state.confirmTableDetail = action.payload;
    },

    setParamsData: (state, action) => {
      state.paramsData = action.payload;
    },
    setSearchParams: (state, action) => {
      state.searchParams = {
        ...state.searchParams,
        [action.payload.name]: action.payload.value,
      };
    },
    clearSearchParams: (state) => {
      state.searchParams = {};
    },
    toggleSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSelectedData,
  setParamsData,
  setSearchParams,
  clearSearchParams,
  toggleSidebarOpen,
} = CommonSlice.actions;

export default CommonSlice.reducer;

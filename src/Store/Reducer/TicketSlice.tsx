import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AlertEnum } from "@/utils/Enums";
import { setLoading, setMessage } from "./LayoutsSice";
import {
  createTicketApi,
  deleteTicketApi,
  downloadTicketApi,
  getAllTicketsApi,
  updateTicketApi,
} from "@/Routes/Service";

const initialState = {
  tickets: [],
  TicketList: [],
};

export const createTicket = createAsyncThunk(
  "createTicket",
  async (values:{
    reported_by?: string | number;
    priority_level?: string;
    summary?: string;
    ticket_type?: string;
    form?:  string | number;
    status?: string;
  }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await createTicketApi(values);
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

export const ticketList = createAsyncThunk(
  "ticketList",
  async (values: string | number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await getAllTicketsApi(values);
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

export const deleteTicket = createAsyncThunk(
  "deleteTicket",
  async (
    values: {
      ticket_id: any;
    },
    { dispatch }
  ) => {
    try {
      dispatch(setLoading(true));
      const result = await deleteTicketApi(values);
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

//line 93 updated with body add and passed to apicalling function with ticketss
//Line check
export const updateTicket = createAsyncThunk(
  "updateTicket",
  async (values:{ticket_id: any}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      
      const body = {
        status: "completed",
      };

      const result = await updateTicketApi(values, body);
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


export const downloadTicket = createAsyncThunk(
  "downloadTicket",
  async (values:any, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const result = await downloadTicketApi(values);
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

const TicketSlice = createSlice({
  name: " TicketSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.tickets = action.payload;
    });
    builder.addCase(ticketList.fulfilled, (state, action) => {
      state.TicketList = action.payload;
    });
  },
});


export default TicketSlice.reducer;

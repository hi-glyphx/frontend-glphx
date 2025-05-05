import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Reducer/AuthSlice";
import CaseSlice from "./Reducer/CaseSlice";
import UserSlice from "./Reducer/UserSlice";
import GroupsSlice from "./Reducer/GroupsSlice";
import ClassificationSlice from "./Reducer/ClassificationSlice";
import ExtractionSlice from "./Reducer/ExtractionSlice";
import CommonSlice from "./Reducer/CommonSlice";
import LayoutSlice from "./Reducer/LayoutsSice";
import ReportsSlice from "./Reducer/ReportsSlice";
import TicketSlice from "./Reducer/TicketSlice";

export const store = configureStore({
  reducer: {
    AuthSlice: AuthSlice,
    CaseSlice: CaseSlice,
    UserSlice: UserSlice,
    GroupsSlice: GroupsSlice,
    ClassificationSlice: ClassificationSlice,
    ExtractionSlice: ExtractionSlice,
    CommonSlice: CommonSlice,
    LayoutSlice: LayoutSlice,
    ReportsSlice: ReportsSlice,
    TicketSlice: TicketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch


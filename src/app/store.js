import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import orgReducer from "../features/organizations/orgSlice";
import eventReducer from "../features/organizations/eventSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        org: orgReducer,
        event: eventReducer,
    }
});
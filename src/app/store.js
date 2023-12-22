import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import orgReducer from "../features/organizations/orgSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        org: orgReducer
    }
});
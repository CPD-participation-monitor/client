import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orgService from "./orgService";

const initialState = {
    events: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    errorMessage: ''
};

export const getOrgEvents = createAsyncThunk(
    'event/getOrgEvents',
    async (orgID, thunkAPI) => {
        try {
            await orgService.getOrgEvents(orgID);
        } catch (error) {
            const message = error?.response?.data?.reason || error?.message || error.toString() || "Server is disconnected";
            console.log("from orgSlice: ", message);
            return thunkAPI.rejectWithValue({ errorMessage: message });
        }
    }
);

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isErrored = false;
            state.errorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrgEvents.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isErrored = false;
                state.errorMessage = '';
            })
            .addCase(getOrgEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isErrored = false;
                state.errorMessage = '';
                state.events = action.payload;
            })
            .addCase(getOrgEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isErrored = true;
                state.errorMessage = action.payload?.errorMessage;
            })
    }
});

export const { reset } = eventSlice.actions;

export default eventSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orgService from "./orgService";

const initialState = {
    organizations: [],
    isLoading: false,
    isErrored: false,
    isSuccess: false,
    errorMessage: ''
}

// Get all organizations - basic details - from the server
export const getAllOrganizations = createAsyncThunk(
    'org/getAllOrganizations', 
    async (thunkAPI) => {
        try {
            return await orgService.getAllOrganizations();
        } catch (error) {
            const message = error?.response?.data?.reason || error?.message || error.toString() || "Server is disconnected";
            console.log("from orgSlice: ", message)
            return thunkAPI.rejectWithValue({ errorMessage: message }); 
        }
    }
);

export const orgSlice = createSlice({
    name: 'org',
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
            .addCase(getAllOrganizations.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isErrored = false;
                state.errorMessage = '';
            })
            .addCase(getAllOrganizations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isErrored = false;
                state.errorMessage = '';
                state.organizations = action.payload;
            })
            .addCase(getAllOrganizations.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isErrored = true;
                state.errorMessage = action?.payload?.errorMessage;
            })
    }
});

export const { reset } = orgSlice.actions;

export default orgSlice.reducer;
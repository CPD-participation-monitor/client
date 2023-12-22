import  { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isErrored: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
}

// Register user
export const register = createAsyncThunk(
    'auth/register', 
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = error?.response?.data?.reason || error?.message || error.toString() || "Server is disconnected";
            return thunkAPI.rejectWithValue({ errorMessage: message }); 
        }
    }
);

// Login user
export const login = createAsyncThunk(
    'auth/login', 
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            const message = error?.response?.data?.reason || error?.message || error.toString() || "Server is disconnected";
            return thunkAPI.rejectWithValue({ errorMessage: message }); 
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout', 
    async () => {
        await authService.logout(); 
    }
);

export const authSlice = createSlice({
    name: 'auth',
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
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isErrored = true;
                state.errorMessage = action?.payload?.errorMessage;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isErrored = true;
                state.errorMessage = action?.payload?.errorMessage;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootReducer } from '../../shared/store';

type AuthState = {
    userId?: string;
    loginError?: string;
};
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: localStorage.getItem('userId'),
    } as AuthState,
    selectors: {
        userId: (state) => state.userId,
        loginError: (state) => state.loginError,
    },
    reducers: {
        addUser(state, action: PayloadAction<Required<AuthState>>) {
            state.userId = action.payload.userId;
            state.loginError = undefined;
        },
        removeUser(
            state,
            action: PayloadAction<Required<AuthState>>
        ) {
            state.userId = undefined;
        },
        setError(state, action: PayloadAction<string | undefined>) {
            state.loginError = action.payload;
        },
    },
}).injectInto(rootReducer);

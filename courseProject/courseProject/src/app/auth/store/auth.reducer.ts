import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import { authSuccess, authFailed, loginStart, logout, signUpStart, clearError } from "./auth.actions";

export interface AuthState {
    user: User,
    _tokenExpirationTimer: any;
    authError: string,
    loading: boolean
}

const initalState: AuthState = {
    user: null,
    _tokenExpirationTimer: null,
    authError: null,
    loading: false,
};

export const authReducer = createReducer(initalState,
    on(authSuccess, (state, action) => ({
        ...state,
        user: new User(action.email, action.userId, action.token,action.expirationDate),
        authError: null,
        loading: false
    })),
    on(logout, (state) => ({
        ...state,
        user: null
    })),
    on(loginStart, signUpStart, (state) => ({
        ...state,
        authError: null,
        loading: true
    })),
    on(authFailed, ((state,action)  => ({
        ...state,
        user: null,
        authError: action.error,
        loading: false
    }))),
    on(clearError, (state) => ({
        ...state,
        authError: null
    }))
    );
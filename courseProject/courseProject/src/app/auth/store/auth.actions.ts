import { createAction, props } from "@ngrx/store";


export const authSuccess = createAction(
    '[Auth] Auth Success',
    props<{email: string, userId: string, token: string, expirationDate: Date}>()
)

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{email: string, password: string}>()
)

export const authFailed = createAction(
    '[Auth] Auth Failed',
    props<{error: string}>()
)

export const logout = createAction(
    '[Auth] Logout'
)

export const signUpStart = createAction(
    '[Auth] Signup Start',
    props<{email: string, password: string}>()
)

export const clearError = createAction(
    '[Auth] Clear Error'
)

export const autoLogin = createAction(
    '[Auth] Auto Login'
)
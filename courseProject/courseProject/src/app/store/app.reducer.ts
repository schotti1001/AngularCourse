import { ActionReducerMap, createReducer, createReducerFactory } from "@ngrx/store";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { State, shopplingListReducer } from "../shoppingList/store/shopping-list.reducer";

export interface AppState {
    shoppingList: State,
    auth: AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
 shoppingList: shopplingListReducer,
 auth: authReducer
}
import { ActionReducerMap, createReducer, createReducerFactory } from "@ngrx/store";
import { AuthState, authReducer } from "../auth/store/auth.reducer";
import { State, shopplingListReducer } from "../shoppingList/store/shopping-list.reducer";
import { RecipeReducer, RecipeState } from "../receipeBook/store/recipes.reducers";

export interface AppState {
    shoppingList: State,
    auth: AuthState,
    recipes: RecipeState
}

export const appReducer: ActionReducerMap<AppState> = {
 shoppingList: shopplingListReducer,
 auth: authReducer,
 recipes: RecipeReducer
}
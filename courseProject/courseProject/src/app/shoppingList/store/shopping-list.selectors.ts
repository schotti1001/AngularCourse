import { AppState } from "../../store/app.reducer";
import { State } from "./shopping-list.reducer";

export const selectAllIngredients = (state: AppState) => state.shoppingList.ingredients;

export const shopping = (state: AppState) => state.shoppingList;
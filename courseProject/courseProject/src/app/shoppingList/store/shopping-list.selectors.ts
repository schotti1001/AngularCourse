import { Ingredient } from "../../shared/ingredient.model";
import { State } from "./shopping-list.reducer";

export const selectAllIngredients = (state: {shoppingList: State}) => state.shoppingList.ingredients;

export const shopping = (state: {shoppingList: State}) => state.shoppingList;
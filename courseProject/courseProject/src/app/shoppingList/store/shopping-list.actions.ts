import { createAction, props } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const addIngredient = createAction(
    '[ShoppingList] AddIngredient',
    props<{ingredient: Ingredient}>()
);

export const addIngredients = createAction(
    '[ShoppingList] AddIngredients',
    props<{ingredients: Ingredient[]}>()
);

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

export const updateIngredients = createAction(
    '[ShoppingList] UpdateIngredients',
    props<{updatedIngredient: Ingredient}>()
);

export const startedEditing = createAction(
    '[ShoppingList] startedEditing',
    props<{index:number}>()
);

export const stopEditing = createAction(
    '[ShoppingList] stopEditing',
);

export const deleteItem = createAction(
    '[ShoppingList] deleteItem',
);
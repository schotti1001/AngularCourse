import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addIngredients, startedEditing, stopEditing, updateIngredients } from "./shopping-list.actions";

export interface State {
    ingredients : Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number,
}

const initalState: State = {
    ingredients : [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
    ],
};

export const shopplingListReducer = createReducer(initalState,
    on(addIngredient, (state, action) => ({
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
        })),
    on(addIngredients, (state, action) => ({
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
        })),
    );
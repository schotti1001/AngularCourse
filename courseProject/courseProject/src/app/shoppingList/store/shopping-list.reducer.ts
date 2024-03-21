import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredient, addIngredients, deleteItem, startedEditing, stopEditing, updateIngredients } from "./shopping-list.actions";

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
    editedIngredient: null,
    editedIngredientIndex: -1,
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
    on(updateIngredients, (state, action) => {
        var newArray = [...state.ingredients];
        newArray[state.editedIngredientIndex] = action.updatedIngredient;

        return {
        ...state,
        ingredients: newArray,
        editedIngredient: null,
        editedIngredientIndex: -1
        };
    }),
    on(deleteItem, (state) => ({
        ...state,
        ingredients: state.ingredients.filter((_, index) => {
            return index != state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
        })),
    on(startedEditing, (state, action) => ({
        ...state,
        editedIngredientIndex: action.index,
        editedIngredient: {...state.ingredients[action.index]}
        })),
    on(stopEditing, (state) => ({
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
        }))
    );
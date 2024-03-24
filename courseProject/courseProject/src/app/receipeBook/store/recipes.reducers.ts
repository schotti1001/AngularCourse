import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import { addRecipe, deleteRecipe, setRecipes, updateRecipe } from "./recipes.actions";


export interface RecipeState {
    recipes: Recipe[]
}

const initalState: RecipeState = {
    recipes: []
}

export const RecipeReducer = createReducer(initalState,
    on(setRecipes, (state, action) => ({
        ...state,
        recipes: action.recipes
    })),
    on(addRecipe, (state, action) => ({
            ...state,
            recipes: [...state.recipes, action.recipe]
        
    })),
    on(updateRecipe, (state, action) => {
        const updatedRecipes = state.recipes.slice();
        updatedRecipes[action.index] = action.recipe;

        return {
        ...state,
        recipes: updatedRecipes
        }
    }),
    on(deleteRecipe, (state, action) => {
        const newRecipes = [...state.recipes];
        newRecipes.splice(action.index, 1);
        return  {
            ...state,
            recipes: newRecipes
            };
    }
        
   
    ),
    );
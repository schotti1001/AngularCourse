import { AppState } from "../../store/app.reducer";


export const getRecipes = (state: AppState) => [...state.recipes.recipes];

export const recipeState = (state: AppState) => state.recipes;

export const getRecipeById = (searchedId:number) => (state: AppState) => state.recipes.recipes[searchedId];


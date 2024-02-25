import { Component } from "@angular/core";
import { Recipe } from "./recipe.model";

@Component({
    selector: 'app-recipe',
    styleUrl: './recipe.component.css',
    templateUrl: './recipe.component.html'
})
export  class Recipes {
    selectedRecipe: Recipe;

    recipeClicked(recipe: Recipe){
        this.selectedRecipe = recipe;
    }
}
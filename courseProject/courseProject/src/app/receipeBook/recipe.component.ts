import { Component, } from "@angular/core";
import { Recipe } from "./recipe.model";

@Component({
    selector: 'app-recipe',
    styleUrl: './recipe.component.css',
    templateUrl: './recipe.component.html'
})
export  class RecipesComponent {
    selectedRecipe: Recipe;

    constructor() {
    }


}
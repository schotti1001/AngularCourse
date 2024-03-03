import { Component, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { RecipeBookService } from "./recipe-book.service";

@Component({
    selector: 'app-recipe',
    styleUrl: './recipe.component.css',
    templateUrl: './recipe.component.html'
})
export  class RecipesComponent implements OnInit{
    selectedRecipe: Recipe;

    constructor(private recipeBookService: RecipeBookService) {
    }

    ngOnInit(): void {
        this.recipeBookService.recipeSelected.subscribe((recipe: Recipe) => {
            this.selectedRecipe = recipe;
        });
    }
}
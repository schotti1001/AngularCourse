import { style } from "@angular/animations";
import { Component, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css'
})
export class RecipeList{
    recipes: Recipe[] = [
        new Recipe('A test recipe', 'simply a test', 'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*')
    ,        new Recipe('Another test recipe', 'simply a test', 'https://hips.hearstapps.com/hmg-prod/images/crepes-index-64347419e3c7a.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*')

    ];

    @Output() recipeClickedEvent = new EventEmitter<Recipe>();


    recipeClicked(recipe: Recipe){
        this.recipeClickedEvent.emit(recipe);
    }
}
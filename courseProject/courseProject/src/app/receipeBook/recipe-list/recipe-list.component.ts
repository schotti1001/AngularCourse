import { style } from "@angular/animations";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeBookService } from "../recipe-book.service";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css'
})
export class RecipeList implements OnInit{
    recipes: Recipe[];

    constructor(private recipeBookService: RecipeBookService) {}

    ngOnInit(): void {
        this.recipes = this.recipeBookService.getRecipes();
    }
}
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeBookService } from "../recipe-book.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{
    recipes: Recipe[];
    subscription: Subscription;

    constructor(private recipeBookService: RecipeBookService) {}

    ngOnInit(): void {
        this.subscription = this.recipeBookService.recipesChanged.subscribe((recipes: Recipe[])=> {
            this.recipes = recipes;
        })
        this.recipes = this.recipeBookService.getRecipes();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();   
    }
}
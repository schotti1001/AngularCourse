import { Component,  OnDestroy, OnInit, } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import {  recipeState } from "../store/recipes.selectors";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{
    recipes: Recipe[];
    subscription: Subscription;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.subscription = this.store.select(recipeState)
        .subscribe(recipes => {
            this.recipes = recipes.recipes;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();   
    }
}
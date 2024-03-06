import {  Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeBookService  {
    
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    // [
      
    //     new Recipe(  
    //         'Schweinebraten', 
    //     'Am bestn mit Knedl', 
    //     'https://www.einfachkochen.de/sites/einfachkochen.de/files/styles/full_width_tablet_4_3/public/2022-11/2022_schweinebraten-mit-kruste_aufmacher.jpg',
    //     [
    //         new Ingredient('Doade Sau', 1),
    //         new Ingredient('Gmias fürd Soß', 5)
    //     ]),
    //     new Recipe(
    //         'Leberkassemmel',
    //      'Einfach guad',
    //       'https://falstaff.b-cdn.net/storage/2017/12/leberkassemmel-leberkas-report-c-shutterstock-2640.jpg',
    //       [
    //         new Ingredient('Doade Sau', 1),
    //         new Ingredient('Frische Semme', 1)
    //       ])
    // ];

    getRecipes() {
        return this.recipes.slice();
    }

    getIdForNewRecipe(){
        return this.recipes.length;
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe:Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number,) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(recipes);
    }
}
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class RecipeBookService  {
    
    private recipes: Recipe[] =[
        new Recipe('Schweinebraten', 
        'Am bestn mit Knedl', 
        'https://www.einfachkochen.de/sites/einfachkochen.de/files/styles/full_width_tablet_4_3/public/2022-11/2022_schweinebraten-mit-kruste_aufmacher.jpg?h=6eb229a4&itok=xbC6oQhc',
        [
            new Ingredient('Doade Sau', 1),
            new Ingredient('Gmias fürd Soß', 5)
        ]),
        new Recipe('Leberkassemmel',
         'Einfach guad',
          'https://falstaff.b-cdn.net/storage/2017/12/leberkassemmel-leberkas-report-c-shutterstock-2640.jpg',
          [
            new Ingredient('Doade Sau', 1),
            new Ingredient('Frische Semme', 1)
          ])
    ];
    recipeSelected = new EventEmitter<Recipe>();


    getRecipes() {
        return this.recipes.slice();
    }
}
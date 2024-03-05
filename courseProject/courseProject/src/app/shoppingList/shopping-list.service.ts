import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();

    private ingredients:Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
    ];

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients);
    }

    getIngredients() {
        return this.ingredients.slice();
    }

}
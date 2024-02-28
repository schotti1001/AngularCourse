import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookService } from '../recipe-book.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shoppingList/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
    @Input() recipe: Recipe;
    

    constructor(private shoppingList: ShoppingListService) {
    }

    sendIngredientsToShoppingList(){
        console.log('adding')
        for(var ingredient of this.recipe.ingredients){
            this.shoppingList.addIngredient(ingredient);
        }
    }
}

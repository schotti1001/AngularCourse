import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookService } from '../recipe-book.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shoppingList/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
     recipe: Recipe;
    

    constructor(
        private shoppingList: ShoppingListService, 
        private recipes: RecipeBookService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
       this.route.params.subscribe((parmas: Params) => {
            this.recipe = this.recipes.getRecipeById(+parmas['id']);
       });
    }

    sendIngredientsToShoppingList(){
        for(var ingredient of this.recipe.ingredients){
            this.shoppingList.addIngredient(ingredient);
        }
    }
}

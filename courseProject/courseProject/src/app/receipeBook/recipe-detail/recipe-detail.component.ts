import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookService } from '../recipe-book.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shoppingList/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
     recipe: Recipe;
     id: number;

    constructor(
        private shoppingList: ShoppingListService, 
        private recipes: RecipeBookService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
       this.route.params.subscribe((parmas: Params) => {
            var paramId = +parmas['id'];
            this.recipe = this.recipes.getRecipeById(paramId);
            this.id = paramId;
       });
    }

    sendIngredientsToShoppingList(){
        for(var ingredient of this.recipe.ingredients){
            this.shoppingList.addIngredient(ingredient);
        }
    }

    deleteRecipe(){
        this.recipes.deleteRecipe(this.id);
        this.router.navigate(['..'], {relativeTo: this.route})
    }
}

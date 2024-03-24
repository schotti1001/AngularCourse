import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { addIngredients } from '../../shoppingList/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { getRecipeById } from '../store/recipes.selectors';
import { Subscription } from 'rxjs';
import { deleteRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
     recipe: Recipe;
     id: number;
     subRecipe: Subscription;
     subRoute: Subscription;

    constructor( 
        private route: ActivatedRoute,
        private router: Router,
        private store: Store) {
    }

    ngOnInit(): void {
       this.subRoute = this.route.params.subscribe((parmas: Params) => {
            var paramId = +parmas['id'];
            this.subRecipe = this.store.select(getRecipeById(paramId)).subscribe(
                value => {
                    this.recipe = value;
                }
            );
            this.id = paramId;
       });
    }

    ngOnDestroy(): void {
        if(this.subRecipe) {
            this.subRecipe.unsubscribe();
        }
        if(this.subRoute) {
            this.subRoute.unsubscribe();
        }
    }

    sendIngredientsToShoppingList(){
        this.store.dispatch(addIngredients({ingredients: this.recipe.ingredients}))
    }

    deleteRecipe(){
        this.store.dispatch(deleteRecipe({index:this.id}))
        this.router.navigate(['..'], {relativeTo: this.route})
    }
}

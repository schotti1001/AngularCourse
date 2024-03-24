import { inject } from "@angular/core";
import { ResolveFn, } from "@angular/router";
import { Observable, of, switchMap, take, } from "rxjs";
import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { fetchRecipes } from "../store/recipes.actions";
import { getRecipes } from "../store/recipes.selectors";

export const recipeResolver: ResolveFn<Recipe[]> = (): Observable<Recipe[]> => {
    const store = inject(Store);
    const actions$ = inject(Actions);

    return store.select(getRecipes).pipe(
        take(1),
        switchMap(recipes => {
        if(recipes.length === 0){
            store.dispatch(fetchRecipes());
        
            return actions$.pipe(
                ofType('[Recipe] Set Recipes'),
                take(1),
            );
        } else {
            return of(recipes);
        }
    
       

    }))
   
};
   
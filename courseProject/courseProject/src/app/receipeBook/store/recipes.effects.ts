import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipe.model";
import { fetchRecipes, setRecipes, storeRecipes } from "./recipes.actions";
import { Store } from "@ngrx/store";
import { getRecipes } from "./recipes.selectors";
import { AppState } from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {
    fetchRecipes = createEffect(() => this.actions$.pipe(
        ofType(fetchRecipes),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-62d83-default-rtdb.firebaseio.com/recipes.json')    
        }),
        map(recipes => {
            if(recipes!= null) {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
                })
            } else {
                return [];
            }
          
        }),
        map(recipes => {
            return setRecipes({recipes: recipes});
        }))
    )

    storeRecipes = createEffect(() => this.actions$.pipe(
        ofType(storeRecipes),
        withLatestFrom(this.store.select(getRecipes)),
        switchMap(([_, recipes]) => {
            return this.http.put('https://ng-course-recipe-book-62d83-default-rtdb.firebaseio.com/recipes.json', recipes);
           
        })
    ), {dispatch:false})

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>){}
}
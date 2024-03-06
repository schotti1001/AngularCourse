import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipe.model";
import { DataStorageService } from "../../shared/data-storage.service";
import { RecipeBookService } from "../recipe-book.service";

export const recipeResolver: ResolveFn<Recipe[]> = (
    route: ActivatedRouteSnapshot,  state: RouterStateSnapshot
   ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => 
   {
    const recipes = inject(RecipeBookService).getRecipes();
    if(recipes.length === 0 ) {
        return inject(DataStorageService).fetchData();
    } else {
        return recipes;
    }
 };
   
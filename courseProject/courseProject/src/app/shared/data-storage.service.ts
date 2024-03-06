import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeBookService } from "../receipeBook/recipe-book.service";
import { Recipe } from "../receipeBook/recipe.model";
import { map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor( private http: HttpClient,
        private recipeService: RecipeBookService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-62d83-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => console.log(response));
    }

    fetchData(){
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-62d83-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
            })
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
       
    }
}
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeBookService } from "../receipeBook/recipe-book.service";
import { Recipe } from "../receipeBook/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor( private http: HttpClient,
        private recipeService: RecipeBookService,
        private authService: AuthService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-62d83-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => console.log(response));
    }

    fetchData(){
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-62d83-default-rtdb.firebaseio.com/recipes.json?auth=' + user.token);}),
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));
    }
}
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shoppingList/shopping-list/shopping-list.component";
import { RecipesComponent } from "./receipeBook/recipe.component";
import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./receipeBook/recipe-detail/recipe-detail.component";
import { NoRecipeSelectecdComponent } from "./receipeBook/no-recipe-selectecd/no-recipe-selectecd.component";
import { RecipeEditComponent } from "./receipeBook/recipe-edit/recipe-edit.component";
import { recipeResolver } from "./receipeBook/recipe-detail/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    {path:'', redirectTo: '/recipes', pathMatch: 'full'},
    {path:'shopping-list', component: ShoppingListComponent},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: NoRecipeSelectecdComponent, pathMatch: 'full'},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver]},
        {path: ':id/edit', component: RecipeEditComponent},
    ]},
    {path: 'auth', component: AuthComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
 
    
}
import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { canActivateGuard } from "../auth/auth.guard";
import { NoRecipeSelectecdComponent } from "./no-recipe-selectecd/no-recipe-selectecd.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { recipeResolver } from "./recipe-detail/recipes-resolver.service";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipe.component";

const routes: Routes = [
    {path: '', component: RecipesComponent,
    canActivate: [canActivateGuard],
    children: [
        {path: '', component: NoRecipeSelectecdComponent, pathMatch: 'full'},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver]},
        {path: ':id/edit', component: RecipeEditComponent},
]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {} //Klasse ist optional wäre auch möglich direkt in der recipes.module.ts zu exportieren
import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipe.component";
import { NoRecipeSelectecdComponent } from "./no-recipe-selectecd/no-recipe-selectecd.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
    declarations: [
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeEditComponent,
        NoRecipeSelectecdComponent,
    ], exports: [
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeEditComponent,
        NoRecipeSelectecdComponent,
    ], imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule{}
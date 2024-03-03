import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shoppingList/shopping-list/shopping-list.component';
import { EditShoppingListComponent } from './shoppingList/edit-shopping-list/edit-shopping-list.component';
import { RecipeItemComponent } from './receipeBook/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './receipeBook/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './receipeBook/recipe.component'
import { RecipeList } from './receipeBook/recipe-list/recipe-list.component'
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NoRecipeSelectecdComponent } from './receipeBook/no-recipe-selectecd/no-recipe-selectecd.component';
import { RecipeEditComponent } from './receipeBook/recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    EditShoppingListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeList,
    DropdownDirective,
    NoRecipeSelectecdComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

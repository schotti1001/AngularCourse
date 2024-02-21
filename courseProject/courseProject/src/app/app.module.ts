import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shoppingList/shopping-list/shopping-list.component';
import { EditShoppingListComponent } from './shoppingList/edit-shopping-list/edit-shopping-list.component';
import { RecipeItemComponent } from './receipeBook/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './receipeBook/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header.component';
import { Recipes } from './receipeBook/recipe.component'
import { RecipeList } from './receipeBook/recipe-list/recipe-list.component'


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    EditShoppingListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    Recipes,
    RecipeList
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

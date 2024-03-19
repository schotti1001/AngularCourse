import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shoppingList/shopping-list/shopping-list.component';
import { EditShoppingListComponent } from './shoppingList/edit-shopping-list/edit-shopping-list.component';
import { RecipeItemComponent } from './receipeBook/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './receipeBook/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './receipeBook/recipe.component'
import { RecipeListComponent } from './receipeBook/recipe-list/recipe-list.component'
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NoRecipeSelectecdComponent } from './receipeBook/no-recipe-selectecd/no-recipe-selectecd.component';
import { RecipeEditComponent } from './receipeBook/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataStorageService } from './shared/data-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    EditShoppingListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    DropdownDirective,
    NoRecipeSelectecdComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

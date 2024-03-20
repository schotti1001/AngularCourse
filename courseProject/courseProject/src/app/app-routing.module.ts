import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const appRoutes: Routes = [
    {path:'', redirectTo: '/recipes', pathMatch: 'full'},
    {path:'recipes', loadChildren: () => import('./receipeBook/recipes.module').then(x => x.RecipesModule)},
    {path:'shopping-list', loadChildren: () => import('./shoppingList/shopping-list.module').then(x => x.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)}
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{
 
    
}
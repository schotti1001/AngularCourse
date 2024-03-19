import { NgModule } from "@angular/core";
import { EditShoppingListComponent } from "./edit-shopping-list/edit-shopping-list.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "../receipeBook/recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

const routes : Routes = [  
      {path:'shopping-list', component: ShoppingListComponent},
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        EditShoppingListComponent,
    ], imports: [
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
    ]
})
export class ShoppingListModule {}
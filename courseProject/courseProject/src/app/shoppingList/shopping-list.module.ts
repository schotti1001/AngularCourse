import { NgModule } from "@angular/core";
import { EditShoppingListComponent } from "./edit-shopping-list/edit-shopping-list.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

const routes : Routes = [  
      {path:'', component: ShoppingListComponent},
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
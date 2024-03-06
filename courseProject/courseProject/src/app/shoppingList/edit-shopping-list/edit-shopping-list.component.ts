import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrl: './edit-shopping-list.component.css'
})
export class EditShoppingListComponent implements OnInit, OnDestroy{  
    @ViewChild('f', {static: false}) form: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit(): void {
        this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
            this.editMode = true;
            this.editedItemIndex = index;
            this.editedItem = this.shoppingListService.getIngredient(index);
            this.form.setValue({
                'name': this.editedItem.name,
                'amount': this.editedItem.amount
            });
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addIngredient(form: NgForm){
        var newIngredient = new Ingredient(form.value.name, form.value.amount);

        if(this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
        } else{
            this.shoppingListService.addIngredient(newIngredient);
        }
        this.clearForm();
    }

    clearForm() {
        this.editMode = false;
        this.editedItemIndex = -1;
        this.editedItem = null;
        this.form.reset();
    }

    deleteItem() {
        this.shoppingListService.deleteItem(this.editedItemIndex);
        this.clearForm();
    }
}

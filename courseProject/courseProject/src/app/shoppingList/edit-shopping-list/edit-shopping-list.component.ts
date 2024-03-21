import { Component, OnDestroy, OnInit,  ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { addIngredient, deleteItem, stopEditing, updateIngredients } from '../store/shopping-list.actions';
import { shopping } from '../store/shopping-list.selectors';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrl: './edit-shopping-list.component.css'
})
export class EditShoppingListComponent implements OnInit, OnDestroy{  
    @ViewChild('f', {static: false}) form: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItem: Ingredient;

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.subscription = this.store.select(shopping).subscribe(data => {
            if(data.editedIngredientIndex > -1) {
                this.editMode = true;
                this.editedItem = data.editedIngredient;
                this.form.setValue({
                    'name': this.editedItem.name,
                    'amount': this.editedItem.amount
                });
            } else {
                this.editMode = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch(stopEditing());
    }

    addIngredient(form: NgForm){
        var newIngredient = new Ingredient(form.value.name, form.value.amount);

        if(this.editMode) {
            this.store.dispatch(updateIngredients({updatedIngredient: newIngredient}))
        } else{
            this.store.dispatch(addIngredient({ingredient: newIngredient}));
        }
        this.clearForm();
    }

    clearForm() {
        this.editMode = false;
        this.editedItem = null;
        this.form.reset();
        this.store.dispatch(stopEditing());
    }

    deleteItem() {
        this.store.dispatch(deleteItem());
        this.clearForm();
    }
}

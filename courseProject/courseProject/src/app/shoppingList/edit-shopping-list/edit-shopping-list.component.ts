import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrl: './edit-shopping-list.component.css'
})
export class EditShoppingListComponent {
    @ViewChild('nameInput', {static:false})nameInputRef: ElementRef;
    @ViewChild('amountInput', {static:false})amountInputRef: ElementRef;

    @Output() ingredientAdded = new EventEmitter<Ingredient>();


    addIngredient(){
        this.ingredientAdded.emit(new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value));
    }
}

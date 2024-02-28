import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrl: './edit-shopping-list.component.css'
})
export class EditShoppingListComponent {
    @ViewChild('nameInput', {static:false})nameInputRef: ElementRef;
    @ViewChild('amountInput', {static:false})amountInputRef: ElementRef;

    constructor(private shoppingListService: ShoppingListService) {}

    addIngredient(){
        var newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
        this.shoppingListService.addIngredient(newIngredient);
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private shopppingListService: ShoppingListService) {}
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit(): void {
        this.ingredients = this.shopppingListService.getIngredients();
        this.subscription = this.shopppingListService.ingredientChanged.subscribe((ingredientsp: Ingredient[]) => {
            this.ingredients = ingredientsp;
        })
    }

    onEditItem(index: number) {
        this.shopppingListService.startedEditing.next(index);
    }
}

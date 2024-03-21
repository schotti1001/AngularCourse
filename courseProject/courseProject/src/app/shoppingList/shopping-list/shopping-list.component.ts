import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllIngredients } from '../store/shopping-list.selectors';
import { startedEditing } from '../store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
    ingredients$: Observable<Ingredient[]>;

    constructor(
        private store: Store) {}

    ngOnInit(): void {
        this.ingredients$ = this.store.select(selectAllIngredients);
    }

    onEditItem(index: number) {
        this.store.dispatch(startedEditing({index: index}));
    }
}

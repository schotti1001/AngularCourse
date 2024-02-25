import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() selectedTab = new EventEmitter<string>();

    recipesClicked(){
        console.log('throw 1');
        this.selectedTab.emit('recipe');
    }

    shoppingListClicked(){
        console.log('throw 2');

        this.selectedTab.emit('shopping_list');
    }

}

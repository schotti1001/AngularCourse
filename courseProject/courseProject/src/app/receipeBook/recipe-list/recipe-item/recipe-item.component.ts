import { Component,  Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeBookService } from '../../recipe-book.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
    @Input() recipe: Recipe;
    @Input() index: number;

    constructor(private recipeBookService: RecipeBookService) {}

    clickOnRecipe(){
        this.recipeBookService.recipeSelected.emit(this.recipe);
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { addRecipe, updateRecipe } from '../store/recipes.actions';
import { getRecipeById } from '../store/recipes.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy{
    id: number;
    editMode = false;
    recipeForm: FormGroup;
    subRecipe: Subscription;

    constructor(
                private router: Router,
                private route: ActivatedRoute,
                private store: Store) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
        });
    }

    ngOnDestroy(): void {
        if(this.subRecipe){
            this.subRecipe.unsubscribe();
        }
    }

    private initForm(){
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if(this.editMode) {
            this.subRecipe = this.store.select(getRecipeById(this.id)).subscribe(recipe => {
                recipeName = recipe.name;
                recipeImagePath = recipe.imagePath;
                recipeDescription = recipe.description;
                if(recipe['ingredients']){
                    for( let ingredient of recipe.ingredients) {
                        recipeIngredients.push(
                            new FormGroup({
                                'name': new FormControl(ingredient.name, Validators.required),
                                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                            })
                        );
                    }
                }
            });      
        }
        // Dynamic Form approach
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        })
    }

    onSubmit() {
        const newRecipe = new Recipe(
            this.recipeForm.value['name'],
            this.recipeForm.value['description'],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['ingredients']
        );

        if(this.editMode) {
            this.store.dispatch(updateRecipe({index: this.id, recipe: newRecipe}));
        } else {
            this.store.dispatch(addRecipe({recipe: newRecipe}));
        }
        this.cancelEditing();
    }

    cancelEditing(){
        this.router.navigate(['..'], {relativeTo: this.route});
    }

    onDeleteIngredient(index:number){
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
        )
    }

    get controls() { // a getter!
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
      }
}

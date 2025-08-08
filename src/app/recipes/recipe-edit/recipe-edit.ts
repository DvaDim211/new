import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,

} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getRecipeById } from '../../store';
import { filter, take } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import {Ingredient, Recipe} from '../../model/recipe.model';
import {addRecipe, updateRecipe} from '../../store/actions/recipe.action';

@Component({
  selector: 'app-recipe-edit',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.scss',
})
export class RecipeEdit implements OnInit {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) editMode!: boolean;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  recipeForm!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.required],
      recipeImagePath: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      recipeIngredients: this.fb.array([])
    });


    if (!this.editMode) {
      this.onAddIngredient();
    } else {
      this.store
        .select(getRecipeById(this.id))
        .pipe(
          filter((recipe) => !!recipe),
          take(1),
        )
        .subscribe((recipe) => {
          this.recipeForm.patchValue({
            recipeName: recipe?.name,
            recipeImagePath: recipe?.imagePath,
            recipeDescription: recipe?.description,
          });

          const ingredients = this.recipeForm.get(
            'recipeIngredients',
          ) as FormArray;
          if (recipe?.ingredients) {
            recipe.ingredients.forEach(ingredient => {
              this.ingredients.push(this.createIngredient(ingredient.name, ingredient.amount));
            })
          }
        });
    }
  }

  private createIngredient(name: string = '', amount: number | string = ''): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      amount: [amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
    });
  }

  get ingredientControls(): AbstractControl[] {
    return (this.recipeForm.get('recipeIngredients') as FormArray).controls;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  onAddIngredient() {
    this.ingredients.push(this.createIngredient());
  }

  cancelAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    const formValue = this.recipeForm.value;

    const newRecipe: Recipe = {
      name: formValue.recipeName,
      description: formValue.recipeDescription,
      imagePath: formValue.recipeImagePath,
      ingredients: formValue.recipeIngredients.map((ing: Ingredient) => ({
        name: ing.name,
        amount: +ing.amount  // преобразуем в число
      }))
    };

    if (this.editMode) {
      newRecipe.id = this.id;  // сохраняем существующий ID
      this.store.dispatch(updateRecipe({ recipe: newRecipe }));
    } else {
      this.store.dispatch(addRecipe({ recipe: newRecipe }));
    }

    this.cancelAction();  // или любой переход после отправки
  }

}

import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Recipe } from '../../model/recipe.model';
import { getRecipeById } from '../../store';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-edit',
  imports: [MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.scss',
})
export class RecipeEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  recipeForm!: FormGroup;
  recipe = signal<Recipe | null>(null);
  editMode = signal<boolean>(false);
  id = signal<string>('');

  ngOnInit() {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.id.set(params['id']);

        this.store
          .select(getRecipeById(params['id']))
          .pipe(take(1), takeUntilDestroyed(this.destroyRef))
          .subscribe((recipe) => {
            this.recipe.set(recipe || null);
          });
      });

    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.editMode.set(!!data['editMode']);
        console.log(this.editMode());
        this.initForm();
      });
  }

  private initForm(): void {
    this.recipeForm = this.fb.group({
      recipeName: ['', Validators.required],
      recipeImagePath: ['', Validators.required],
      recipeDescription: ['', Validators.required],
      recipeIngredients: this.fb.array([]),
    });

    if (this.editMode()) {
      const recipeInf = this.recipe();
      if (!recipeInf) return;

      this.recipeForm.patchValue({
        recipeName: recipeInf.name,
        recipeImagePath: recipeInf.imagePath,
        recipeDescription: recipeInf.description,
      });

      if (recipeInf.ingredients) {
        const ingredients = recipeInf.ingredients.map((ingredient) => {
          this.fb.group({
            name: [ingredient.name, Validators.required],
            amount: [
              ingredient.amount,
              [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
            ],
          });
        });
        const formArray = this.recipeForm.get('recipeIngredients') as FormArray;
        recipeInf.ingredients.forEach(ing => {
          formArray.push(
            this.fb.group({
              name: [ing.name, Validators.required],
              amount: [ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
            })
          );
        });
      }
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  onAddIngredient(): void {
    const ingredient = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.ingredients.push(ingredient);
  }

  readonly ingredientControls = computed(() =>
    (this.recipeForm.get('recipeIngredients') as FormArray).controls
  );

  cancelAction() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).controls.splice(index, 1);
  }

  onSubmit() {}


}

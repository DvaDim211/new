import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-recipe-edit',
  imports: [
    MatButton,
    MatFormFieldModule,
    MatInput,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
  ],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.scss'
})
export class RecipeEdit implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  editMode = signal<boolean>(false);
  recipeForm!: FormGroup;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.editMode.set(!!data['editMode']);
      console.log(this.editMode());
    });

  }


  private initForm(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      imagePath: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]),
    });
  }


  get imagePath(): FormControl {
    return this.recipeForm.get('imagePath') as FormControl;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }



  onAddIngredient(): void {
    this.ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }





  getControls() {
    // return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  cancelAction() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {

  }

  onSubmit() {

  };

  ngOnDestroy() {

  }

}

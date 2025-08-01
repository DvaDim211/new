import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  imports: [],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.scss'
})
export class RecipeEdit implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  editMode = signal<boolean>(false);
  recipeForm!: FormGroup;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.editMode.set(!!data['editMode']);
    });

    if(this.editMode()) {

    } else {

    }
  }

  ngOnDestroy() {

  }

  getControls() {
    // return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  cancelAction() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    // (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    //   this.cancelAction();
    // } else {
    //   this.recipeService.addRecipe(this.recipeForm.value);
    //   this.cancelAction();
    // }
  };


}

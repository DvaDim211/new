import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../../model/recipe.model';
import {Store} from '@ngrx/store';
import {Observable, switchMap} from 'rxjs';
import {getRecipeById, getRecipeFeature} from '../../store';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatMenuTrigger,
    AsyncPipe
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  recipeItem$!: Observable<Recipe | undefined>;


  ngOnInit() {
    this.recipeItem$ = this.route.params.pipe(
      switchMap((params: Params) => {
        const id = params['id'];
        return this.store.select(getRecipeById(id));
      })
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    // this.cancelAction();
  }

  addToSL() {
    // this.recipeService.onIngredientsAddedToSL(this.recipeItem.ingredients)
  }

}

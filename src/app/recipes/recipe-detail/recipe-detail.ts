import {Component, computed, inject, Input, input, OnChanges, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../model/recipe.model';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap } from 'rxjs';
import { getRecipeById, getRecipeFeature } from '../../store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe } from '@angular/common';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-detail',
  imports: [
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatMenuTrigger,
    AsyncPipe,
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail implements OnInit, OnChanges {
  @Input({ required:true }) id!: string;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);


  recipeItem$!: Observable<Recipe | undefined>;
  currentImagePath!: string | undefined;

  ngOnInit() {
    // this.recipeItem$ = this.route.params.pipe(
    //   switchMap((params: Params) => {
    //     const id = params['id'];
    //     return this.store.select(getRecipeById(id));
    //   }),
    //   tap((recipe: Recipe | undefined) => {
    //     this.currentImagePath = recipe?.imagePath || 'assets/notFound.jpg';
    //   }),
    // );
    // console.log(this.id(), 'userID signal');
  }

  ngOnChanges() {
    if (this.id) {
      this.recipeItem$ = this.store.select(getRecipeById(this.id)).pipe(
        tap(recipe => {
          this.currentImagePath = recipe?.imagePath || 'assets/notFound.jpg';
        })
      )
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/notFound.jpg';
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  logging() {
    console.log(this.id, 'userID signal');
    console.log(this.recipeItem$);
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    // this.cancelAction();
  }

  addToSL() {
    // this.recipeService.onIngredientsAddedToSL(this.recipeItem.ingredients)
  }
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addRecipe,
  addRecipeFailure,
  addRecipeSuccess,
  loadRecipes,
  loadRecipesFailure,
  loadRecipesSuccess,
} from '../actions/recipe.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';

@Injectable()
export class RecipesEffects {
  private actions$ = inject(Actions);
  private recipesService = inject(RecipeService);

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipes),
      exhaustMap(() =>
        this.recipesService
          .getRecipes('https://ng-course-7a653-default-rtdb.firebaseio.com')
          .pipe(
            map((recipes) => loadRecipesSuccess({ recipes })),
            catchError((error) => of(loadRecipesFailure({ error }))),
          ),
      ),
    ),
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRecipe),
      exhaustMap(({ recipe }) =>
        this.recipesService.addRecipe('https://ng-course-7a653-default-rtdb.firebaseio.com',recipe).pipe(
          map((savedRecipe) => addRecipeSuccess({ recipe: savedRecipe })),
          catchError((error) => of(addRecipeFailure({ error }))),
        ),
      ),
    ),
  );
}

import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { inject, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, take } from 'rxjs';
import { getRecipes } from '../store';
import {
  loadRecipes,
  loadRecipesSuccess,
} from '../store/actions/recipe.action';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Recipe[] | UrlTree> {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private router = inject(Router);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Recipe[] | UrlTree> {
    const targetId = route.params['id'];

    return this.store.select(getRecipes).pipe(
      take(1),
      switchMap((recipes) => {
        if (recipes.length > 0) {
          return this.validateOrRedirect(recipes, targetId);
        } else {
          this.store.dispatch(loadRecipes());
          return this.actions$.pipe(
            ofType(loadRecipesSuccess),
            take(1),
            switchMap(() =>
              this.store.select(getRecipes).pipe(
                take(1),
                switchMap((freshRecipes) =>
                  this.validateOrRedirect(freshRecipes, targetId),
                ),
              ),
            ),
          );
        }
      }),
    );
  }

  private validateOrRedirect(
    recipes: Recipe[],
    id: string | number,
  ): Observable<Recipe[] | UrlTree> {
    const exists = recipes.some((r) => r.id === id);
    if (exists) {
      return of(recipes);
    } else {
      return of(this.router.createUrlTree(['/recipes']));
    }
  }
}

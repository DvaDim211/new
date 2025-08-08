import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  UrlTree,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {map, Observable, of, switchMap, take, timeoutWith} from 'rxjs';
import {getRecipeById} from '../store';
import {
  loadRecipes, loadRecipesFailure,
  loadRecipesSuccess,
} from '../store/actions/recipe.action';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<true | UrlTree> {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<true | UrlTree> {
    const id = route.params['id'];

    return this.store.select(getRecipeById(id)).pipe(
      take(1),
      switchMap(recipe => {
        if (recipe) return of(true as const);

        this.store.dispatch(loadRecipes());

        return this.actions$.pipe(
          ofType(loadRecipesSuccess, loadRecipesFailure),
          take(1),
          switchMap(action => {
            if (action.type === loadRecipesFailure.type) {
              return of(this.router.createUrlTree(['/recipes']));
            }
            return this.store.select(getRecipeById(id)).pipe(
              take(1),
              map(found => found ? (true as const) : this.router.createUrlTree(['/recipes']))
            );
          }),
          timeoutWith(5000, of(this.router.createUrlTree(['/recipes'])))
        );
      })
    );
  }
  //   const id = route.params['id'];
  //
  //   return this.store.select(getRecipeById(id)).pipe(
  //     take(1),
  //     switchMap(recipe => {
  //       console.log('recipe from store', recipe);
  //       if (recipe) {
  //         return of(true as const);
  //       }
  //
  //       this.store.dispatch(loadRecipes());
  //
  //       return this.actions$.pipe(
  //         ofType(loadRecipesSuccess),
  //         take(1),
  //         switchMap(() =>
  //           this.store.select(getRecipeById(id)).pipe(
  //             take(1),
  //             switchMap(found => {
  //               if (found) {
  //                 return of(true as const);
  //               }
  //               console.warn('Redirecting: recipe not found');
  //               debugger;
  //
  //               return of(this.router.createUrlTree(['/recipes']));
  //             })
  //           )
  //         )
  //       );
  //     })
  //   );
  // }

  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,
  // ): Observable<Recipe[] | UrlTree> {
  //   const targetId = route.params['id'];
  //
  //   return this.store.select(getRecipes).pipe(
  //     take(1),
  //     switchMap((recipes) => {
  //       if (recipes.length > 0) {
  //         return this.validateOrRedirect(recipes, targetId);
  //       } else {
  //         this.store.dispatch(loadRecipes());
  //         return this.actions$.pipe(
  //           ofType(loadRecipesSuccess),
  //           take(1),
  //           switchMap(() =>
  //             this.store.select(getRecipes).pipe(
  //               take(1),
  //               switchMap((freshRecipes) =>
  //                 this.validateOrRedirect(freshRecipes, targetId),
  //               ),
  //             ),
  //           ),
  //         );
  //       }
  //     }),
  //   );
  // }
  //
  // private validateOrRedirect(
  //   recipes: Recipe[],
  //   id: string | number,
  // ): Observable<Recipe[] | UrlTree> {
  //   const exists = recipes.some((r) => r.id === id);
  //   if (exists) {
  //     return of(recipes);
  //   } else {
  //     return of(this.router.createUrlTree(['/recipes']));
  //   }
  // }
}

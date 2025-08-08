import { Routes } from '@angular/router';
import {Recipes} from './recipes/recipes';
import {RecipeStart} from './recipes/recipe-start/recipe-start'
import {RecipeEdit} from './recipes/recipe-edit/recipe-edit';
import {RecipeDetail} from './recipes/recipe-detail/recipe-detail';
import {ShoppingList} from './shopping-list/shopping-list';
import {Auth} from './auth/auth';
import {RecipesResolver} from './services/recipes-resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: Recipes,
    children: [
      { path: '', component: RecipeStart },
      { path: 'new',
        component: RecipeEdit,
        data: {editMode: false },
      },
      {
        path: ':id',
        component: RecipeDetail,
        data: { editMode: false },
        // resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEdit,
        data: { editMode: true },
        resolve: { redirect: RecipesResolver },
        runGuardsAndResolvers: 'always'
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingList },
  { path: 'auth', component: Auth}
];

import {createAction, props} from '@ngrx/store';
import {Recipe} from '../../model/recipe.model';

export const loadRecipes = createAction('[Recipe] Load Recipes');

export const loadRecipesSuccess = createAction(
  '[Recipe] Load Recipes Success',
  props<{ recipes: Recipe[] }>()
);

export const loadRecipesFailure = createAction(
  '[Recipe] Load Recipes Failure',
  props<{ error: any }>()
);

export const addRecipe = createAction(
  '[Recipe] Add Recipe',
  props<{ recipe: Recipe }>()
);

export const addRecipeSuccess = createAction(
  '[Recipe] Add Recipe Success',
  props<{ recipe: Recipe }>()
);

export const addRecipeFailure = createAction(
  '[Recipe] Add Recipe Failure',
  props<{ error: any }>()
);

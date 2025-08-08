import { createReducer, on} from '@ngrx/store';
import {Recipe} from '../../model/recipe.model';
import {
  addRecipeSuccess,
  deleteRecipeSuccess,
  loadRecipesFailure,
  loadRecipesSuccess,
  updateRecipeSuccess
} from '../actions/recipe.action';

const initialState: Recipe[] = [];

export const recipeReducer = createReducer(
  initialState,
  on(loadRecipesSuccess, (state, {recipes}) => [...recipes]),
  on(loadRecipesFailure, (state, {error}) => {
    console.log(error);
    return state;
  }),
  on(addRecipeSuccess, (state, {recipe}) => [...state, recipe]),
  on(updateRecipeSuccess, (state, { recipe }) =>
    state.map(r => (r.id === recipe.id ? recipe : r))
  ),
  on(deleteRecipeSuccess, (state, { id }) =>
    state.filter(recipe => recipe.id !== id)
  ),
);

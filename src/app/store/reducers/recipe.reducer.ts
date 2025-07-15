import { createReducer, on} from '@ngrx/store';
import {Recipe} from '../../model/recipe.model';
import {addRecipeSuccess, loadRecipesFailure, loadRecipesSuccess} from '../actions/recipe.action';

const initialState: Recipe[] = [];

export const recipeReducer = createReducer(
  initialState,
  on(loadRecipesSuccess, (state, {recipes}) => [...recipes]),
  on(loadRecipesFailure, (state, {error}) => {
    console.log(error);
    return state;
  }),
  on(addRecipeSuccess, (state, {recipe}) => [...state, recipe])
);

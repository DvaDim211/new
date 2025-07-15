import {ActionReducerMap} from '@ngrx/store';
import {recipeReducer} from './reducers/recipe.reducer';
import {Recipe} from '../model/recipe.model';

export * from './selectors/recipe.selector';

export interface AppState {
  recipes: Recipe[];
}

export const reducers: ActionReducerMap<AppState> = {
  recipes: recipeReducer,
}

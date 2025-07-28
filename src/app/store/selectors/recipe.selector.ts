import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Recipe} from '../../model/recipe.model';


export const getRecipeFeature = createFeatureSelector<Recipe[]>('recipes');

export const getRecipes = createSelector(
  getRecipeFeature,
  (recipes: Recipe[]) => recipes
);

export const getRecipeById = (id: number | string) =>
  createSelector(
    getRecipeFeature,
    (recipes: Recipe[]) => recipes.find((recipe) => recipe.id === String(id))
  )

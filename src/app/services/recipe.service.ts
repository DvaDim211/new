import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe.model';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  // getRecipes(url: string): Observable<Recipe[]> {
  //   return this.http
  //     .get<{ [key: string]: Recipe }>(`${url}/recipes.json`)
  //     .pipe(map((resData) => Object.values(resData)));
  // }

  getRecipes(url: string): Observable<Recipe[]> {
    return this.http.get<{ [key: string]: Recipe }>(`${url}/recipes.json`).pipe(
      map((resData) => {
        const recipesArray: Recipe[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            recipesArray.push({ ...resData[key], id: key });
          }
        }
        return recipesArray;
      }),
    );
  }

  addRecipe(url: string, recipe: Recipe): Observable<Recipe> {
    return this.http
      .post<{ name: string }>(`${url}/recipes.json`, recipe)
      .pipe(map((resData) => ({ ...recipe, id: resData.name })));
  }
}

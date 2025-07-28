import {Component, input} from '@angular/core';
import {Recipe} from '../../../model/recipe.model';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-recipe-item',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatCardModule,
  ],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss'
})
export class RecipeItem {
  recipeItem = input.required<Recipe>();
  index = input.required<number>();
}

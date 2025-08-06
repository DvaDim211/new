import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RecipeList} from './recipe-list/recipe-list';

@Component({
  selector: 'app-recipes',
  imports: [
    RouterOutlet,
    RecipeList
  ],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss'
})
export class Recipes {




}

import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RecipeList} from './recipe-list/recipe-list';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-recipes',
  imports: [
    RouterOutlet,
    RecipeList,
    MatGridListModule,
  ],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss'
})
export class Recipes {




}

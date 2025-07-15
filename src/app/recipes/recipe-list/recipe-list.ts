import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RecipeItem} from './recipe-item/recipe-item';
import {Store} from '@ngrx/store';
import {Recipe} from '../../model/recipe.model';
import {map, Subscription} from 'rxjs';
import {getRecipes} from '../../store';
import {HttpClient} from '@angular/common/http';
import {loadRecipes} from '../../store/actions/recipe.action';

@Component({
  selector: 'app-recipe-list',
  imports: [

  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList implements OnInit, OnDestroy {
  private store = inject(Store);
  recipes:any[] = [];
  recipeSub$!: Subscription;
  // private http = inject(HttpClient);

  ngOnInit() {
    this.store.dispatch(loadRecipes());
    this.recipeSub$ = this.store.select(getRecipes).subscribe(recipes => {
      this.recipes = recipes;
    })
  }


  onNewRecipe() {
    console.log(this.recipes);
  }

  ngOnDestroy() {

  }

}

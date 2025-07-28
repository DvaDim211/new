import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Recipe} from '../../model/recipe.model';
import {Subscription} from 'rxjs';
import {getRecipes} from '../../store';
import {loadRecipes} from '../../store/actions/recipe.action';
import {RecipeItem} from './recipe-item/recipe-item';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [
    RecipeItem

  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  recipes: Recipe[] = [];
  recipeSub$!: Subscription;


  ngOnInit() {
    this.store.dispatch(loadRecipes());
    this.recipeSub$ = this.store.select(getRecipes).subscribe(recipes => {
      this.recipes = recipes;
    })
  }


  onNewRecipe() {
    console.log(this.recipes);
    this.router.navigate(['new'], {relativeTo: this.route});
  }



  ngOnDestroy() {

  }

}

import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})
export class RecipeDetail implements OnInit {
  // private router = inject(Router);
  // private route = inject(ActivatedRoute);
  // recipeItem: Recipe;
  // id: number;
  //
  // ngOnInit() {
  //   this.route.params.subscribe( (params: Params) => {
  //     this.id = +params['id'];
  //     this.recipeItem = this.recipeService.getRecipe(this.id);
  //   })
  // }
  //
  // onEditRecipe() {
  //   this.router.navigate(['edit'], {relativeTo: this.route});
  //   // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  // }
  //
  // cancelAction() {
  //   this.router.navigate(['../'], {relativeTo: this.route});
  // }
  //
  // deleteRecipe() {
  //   this.recipeService.deleteRecipe(this.id);
  //   this.cancelAction();
  // }
  //
  // addToSL() {
  //   this.recipeService.onIngredientsAddedToSL(this.recipeItem.ingredients)
  // }

}

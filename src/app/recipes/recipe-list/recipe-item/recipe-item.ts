import {Component, inject, input, OnDestroy, OnInit, signal} from '@angular/core';
import {Recipe} from '../../../model/recipe.model';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {NgClass} from '@angular/common';
import {filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  imports: [
    RouterLink,
    MatCardModule,
    NgClass,
  ],
  templateUrl: './recipe-item.html',
  styleUrl: './recipe-item.scss'
})
export class RecipeItem implements OnInit, OnDestroy {
  private router = inject(Router);
  recipeItem = input.required<Recipe>();
  index = input.required<number>();
  activatedRecipeId = signal<string | number | null >(null);


  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const url = this.router.url;
        const match = url.match(/recipes\/(\d+)/);
        const id = match?.[1] ?? null;
        this.activatedRecipeId.set(id);
      })
  }

  ngOnDestroy() {

  }

}

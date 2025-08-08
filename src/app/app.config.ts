import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {reducers} from './store';
import {provideStore} from '@ngrx/store';
import {RecipesEffects} from './store/effects/recipe.effect';
import {provideEffects} from '@ngrx/effects';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideStore(reducers),
    provideEffects(RecipesEffects),

  ]
};

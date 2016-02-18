/*
 * Providers provided by Angular
 */
import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

/*
 * App Component
 * our top level component that holds all of our components
 */
import {AppComponent} from './app/app.component';

import {RepositoryService} from './app/database/repository.service';
import {ExerciseService} from './app/database/exercise.service';

import {UserProvider} from './app/user/user.provider.service';

import {ObjectCreatorService} from './app/exercise/object.creator.service';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(AppComponent, [
    ('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
    ROUTER_PROVIDERS,
    RepositoryService,
    ExerciseService,
    UserProvider,
    ObjectCreatorService
  ])
  .catch(err => console.error(err));
});

import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {RouterOutlet} from './router/router-outlet';

import {NavComponent} from './nav/nav.component';
import {OfflineComponent as UserOfflineComponent} from './user/offline.component';
import {OnlineComponent as UserOnlineComponent} from './user/online.component';

import {HomepageComponent} from './homepage/homepage.component';
import {ExerciseComponent} from './exercise/exercise.component';
import {GeneratorComponent} from './generator/generator.component';

import {ROLES} from './user/user.provider.service';

@Component({
    selector: 'app',
    templateUrl: 'src/app/app.component.html',
    directives: [RouterOutlet, NavComponent]
})
@RouteConfig([
    {path: '/', name: 'Homepage', component: HomepageComponent, useAsDefault: true},
    {path: '/exercise/:id', name: 'Exercise', component: ExerciseComponent},
    {path: '/generator', name: 'Generator', component: GeneratorComponent,
            data: {'role': ROLES.ADMIN}},
    {path: '/generator/:id', name: 'Editor', component: GeneratorComponent,
            data: {'role': ROLES.ADMIN}},
    {path: '/user/offline', name: 'UserOffline', component: UserOfflineComponent},
    {path: '/user', name: 'UserOnline', component: UserOnlineComponent,
            data: {'role': ROLES.USER}}
])
export class AppComponent {}

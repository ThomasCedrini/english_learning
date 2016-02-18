import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {UserTemplateProvider} from '../user/template.provider.directive';

@Component({
    selector: 'navbar-component',
    templateUrl: 'src/app/nav/nav.component.html',
    directives: [ROUTER_DIRECTIVES, UserTemplateProvider]
})
export class NavComponent {}

import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {UserTemplateProvider} from '../user/template.provider.directive';
import {BASE_URL} from '../../config.ts';

@Component({
    selector: 'navbar-component',
    templateUrl: BASE_URL+'nav/nav.component.html',
    directives: [ROUTER_DIRECTIVES, UserTemplateProvider]
})
export class NavComponent {}

import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {UserProvider, User, ROLES} from './user.provider.service';
import {BASE_URL} from '../../config.ts';

@Component({
    selector: 'online',
    templateUrl: BASE_URL+'user/online.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class OnlineComponent implements OnInit {

    public user: User;

    constructor(private _userProvider: UserProvider) {}

    public ngOnInit(): void {
        this._userProvider.user.subscribe(user => {
            this.user = user;
        });
    }

}

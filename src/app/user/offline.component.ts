import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {UserProvider, ROLES} from './user.provider.service';

@Component({
    selector: 'offline',
    templateUrl: 'src/app/user/offline.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class OfflineComponent implements OnInit {

    constructor(private _userProvider: UserProvider,
                private _router: Router) {}

    public ngOnInit(): void {
        this._userProvider.user.subscribe(user => {
            if (user.hasRole(ROLES.USER)) {
                this._router.navigate(['UserOnline']);
            }
        });
    }

    public authWithTwitter(): void {
        this._userProvider.authWithTwitter();
    }

    public authWithFacebook(): void {
        this._userProvider.authWithFacebook();
    }

    public authWithGoogle(): void {
        this._userProvider.authWithGoogle();
    }

}

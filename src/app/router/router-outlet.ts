import {Directive, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet as RouterOtl, ComponentInstruction} from 'angular2/router';
import {UserProvider, User, ROLES} from '../user/user.provider.service';

import {OfflineComponent} from '../user/offline.component';

@Directive({
  selector: 'router-outlet'
})

export class RouterOutlet extends RouterOtl {

    constructor(_elementRef: ElementRef,
                _loader: DynamicComponentLoader,
                _parentRouter: Router,
                nameAttr: string,
                private _userProvider: UserProvider) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
    }

    public routerCanDeactivate(nextInstruction: ComponentInstruction) : Promise<boolean> {
        let role: string = nextInstruction.routeData.get('role');
        if (role === null)
            role = ROLES.GUEST;

        return new Promise(resolve => { // Wait until we have a result
            this._userProvider.user.subscribe(user => {
                if (!user.hasRole(role)) {
                    nextInstruction.componentType = OfflineComponent;
                }
                resolve(true);
            });
        });
    }
}

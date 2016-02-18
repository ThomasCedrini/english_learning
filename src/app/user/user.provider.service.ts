import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {FIREBASE_URL} from '../firebase/config';

import {RepositoryService} from '../database/repository.service';
import {User} from '../user/user';
import {ROLES} from '../user/roles';

export {User, ROLES, UserProvider};

@Injectable()
class UserProvider {

    private _ref: Firebase;
    private _prefix= 'users/';
    private _user: Observable<any>;

    constructor(private _repository: RepositoryService,
                private _router: Router) {
        this._ref = new Firebase(FIREBASE_URL);

        this._user = this.onAuth();
    }

    /**
    * Update the database with the user given in parameter
    */
    public setUser(user: User): void {
        // Save the user only if he is logged
        if (user.hasRole(ROLES.USER)) {
            let id: string = user.id;
            if (user.id)
                delete user.id;

            this._repository.setValue(this._prefix + id, user);
        }
    }

    public authWithTwitter(): void {
        this._authWithOAuth('twitter');
    }

    public authWithFacebook(): void {
        this._authWithOAuth('facebook');
    }

    public authWithGoogle(): void {
        this._authWithOAuth('google');
    }

    public logout(): void {
        this._ref.unauth();
        this._router.navigate(['/Homepage']);
    }

    get user(): Observable<any> {
        return this._user;
    }

    private _authWithOAuth(provider: string): void {
        this._ref.authWithOAuthPopup(provider, function(error, authData) {
            if (error) {
                if (error.code === 'TRANSPORT_UNAVAILABLE') {
                    this._ref.authWithOAuthRedirect(provider, function(error) { /* ... */ });
                }
            }
        });
    }

    private _syncWithDB(user: User): Observable<any> {
        if (user.hasRole(ROLES.USER)) {
            return this._repository.getOneValue(this._prefix + user.id).map(data => {
                if (data.snapshot == null) {
                    this.setUser(user);
                } else {
                    if (data.snapshot.exercises)
                        user.exercises = data.snapshot.exercises;
                    if (data.snapshot.roles)
                        user.roles = data.snapshot.roles;
                }

                return user;
            });
        }

        return new Observable(observer => {
            observer.next(user);
        });
    }

    private onAuth(): Observable<any> {
        let res = new ReplaySubject(1);

        function listenAuth(authData) {
            res.next(authData);
        };

        this._ref.onAuth(listenAuth);

        return res.map(function(data: FirebaseAuthData) {

            if (data) { // Format the data into a proper user
                var res: User = new User();
                res.id = data.uid;

                if (data.provider === 'twitter') {
                    res.username = data.twitter.displayName;
                    res.roles.push(ROLES.USER);
                } else if (data.provider === 'google') {
                    res.username = data.google.displayName;
                    res.roles.push(ROLES.USER);
                } else if (data.provider === 'facebook') {
                    res.username = data.facebook.displayName;
                    res.roles.push(ROLES.USER);
                } else if (data.provider === 'anonymous') {
                    res.username = 'Guest';
                }

                return res;
            }
            return null;

        }).flatMap(data => {

            if (data)
                return this._syncWithDB(data);

            // return an observable on null value
            return new Observable(observer => { observer.next(new User()); } );
        });
    }

}

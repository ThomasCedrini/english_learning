import {Directive, OnInit} from 'angular2/core';

import {UserProvider, User} from './user.provider.service';

@Directive({
  selector: 'div, span',
  exportAs: 'user'
})
/*
    In this class we fake a full user in order to simplify the use in the template
*/
export class UserTemplateProvider implements OnInit {

    public id: string;
    public username: string;
    public exercises: number[];
    public roles: string[];

    private _user: User = new User();

    constructor(private _userProvider: UserProvider) {}

    public ngOnInit(): void {
        this._userProvider.user.subscribe(user => {
            this._user = user;

            this.id = user.id;
            this.username = user.username;
            this.exercises = user.exercises;
            this.roles = user.roles;
        });
    }

    public isExerciseDone(id: number): boolean {
        return this._user.isExerciseDone(id);
    }

    public getScore(id: number): number {
        return this._user.getScore(id);
    }

    public hasRole(role: string): boolean {
        return this._user.hasRole(role);
    }

    public logOut(): void {
        this._userProvider.logout();
    }
}

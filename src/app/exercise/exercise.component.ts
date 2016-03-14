import {Component, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {Exercise} from './exercise';
import {ExerciseService} from '../database/exercise.service';

import {QuestionComponent as QCM} from './QCM/question.component';
import {QuestionComponent as SimpleQuestion} from './simpleQuestion/question.component';
import {QuestionComponent as GapFill} from './gapFill/question.component';
import {QuestionComponent as Media} from './media/question.component';

import {UserProvider, User} from '../user/user.provider.service';

import {BASE_URL} from '../../config.ts';

@Component({
    selector: 'exercise',
    templateUrl : BASE_URL+'exercise/exercise.component.html',
    directives: [ROUTER_DIRECTIVES, QCM, SimpleQuestion, GapFill, Media]
})
export class ExerciseComponent implements OnInit {
    public exercise: Exercise;

    public score: number;

    public user: User;

    constructor(
        private _exerciseProvider: ExerciseService,
        private _routeParams: RouteParams,
        private _userProvider: UserProvider,
        private _router: Router) {}

    public ngOnInit(): void {
        this._exerciseProvider.getOne(this._routeParams.get('id')).subscribe(data => {
            this.exercise = data;
        });

        this.score = 0;

        this._userProvider.user.subscribe(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = new User();
            }
        });
    }

    public submit(): void {
        if (this.user) {
            this.user.exercises[this.exercise.id] = this.score;
            this._userProvider.setUser(this.user);
        }
        this._router.navigate(['/Homepage']);
    }
}

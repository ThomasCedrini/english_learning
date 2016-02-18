import {Component, OnInit, Injector, ChangeDetectionStrategy} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/take';

import {Exercise} from '../exercise/exercise';
import {Type} from '../exercise/type';
import {ExerciseService} from '../database/exercise.service';

import {UserTemplateProvider} from '../user/template.provider.directive';
import {UserProvider} from '../user/user.provider.service';

@Component({
    selector: 'homepage',
    templateUrl : 'src/app/homepage/homepage.component.html',
    directives: [ROUTER_DIRECTIVES, UserTemplateProvider]
})
export class HomepageComponent implements OnInit {

    public exercises: Exercise[];
    public types: Type[];

    constructor(
        private _exerciseProvider: ExerciseService
                ) {}

    public ngOnInit(): void {
        this.exercises = [];

        this.types = this._exerciseProvider.types;

        this._exerciseProvider.getAll().subscribe(exercise => {
            this.exercises.push(exercise);
        });
    }

    public deleteOne(exercise: Exercise): void {
        this._exerciseProvider.deleteOne(exercise.id);

        for (let i: number = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].id === exercise.id) {
                this.exercises.splice(i, 1);
                break;
            }
        }
    }
}

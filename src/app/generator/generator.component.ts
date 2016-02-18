import {Component, OnInit, Input, Output, ComponentRef,
        EventEmitter, DynamicComponentLoader, ElementRef} from 'angular2/core';

import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {NewQuestionComponent} from './newQuestion.component';
import {ExerciseService} from '../database/exercise.service';
import {ObjectCreatorService} from '../exercise/object.creator.service';

import {Exercise} from '../exercise/exercise';
import {Type} from '../exercise/type';
import {QCM} from '../exercise/QCM/QCM';
import {SimpleQuestion} from '../exercise/simpleQuestion/simpleQuestion';
import {GapFill} from '../exercise/gapFill/gapFill';
import {Media} from '../exercise/media/media';

@Component({
    selector: 'generator',
    templateUrl : 'src/app/generator/generator.component.html',
    directives: [NewQuestionComponent],
    providers: [ObjectCreatorService]
})
export class GeneratorComponent implements OnInit {

    public exercise: Exercise;
    public types: Type[];

    private _childRef: any[];
    private _nextId: number;

    constructor(private _dcl: DynamicComponentLoader,
                private _elementRef: ElementRef,
                private _exerciseService: ExerciseService,
                private _objectCreator: ObjectCreatorService,
                private _routeParams: RouteParams,
                private _router: Router) {
    }

    public ngOnInit(): void {

        this._childRef = [];
        this._nextId = 0;

        this.exercise = this._objectCreator.createExercise();

        this.types = this._exerciseService.types;

        let id: string;
        if (id = this._routeParams.get('id')) {
            this._exerciseService.getOne(id).subscribe(data => {

                if (!data) {
                    this.addQuestion();
                } else {
                    this.setUpEditor(data);
                }
            });
        } else {
            this.addQuestion();
        }
    }

    public addQuestion(question?: (QCM|SimpleQuestion|GapFill|Media)): void {
        this._dcl.loadIntoLocation(NewQuestionComponent, this._elementRef, 'newQuestion')
        .then(ref => {
            this._childRef.push({id: this._nextId, ref: ref});

            ref.instance.number = this._nextId;

            ref.instance.destroy.subscribe($event => {
                this.removeQuestion($event);
            });

            ref.instance.question = question;

            ref.instance.questionChange.subscribe($event => {
                this.onQuestionChange($event);
            });

             this._nextId++;
        });
    }

    public removeQuestion(id: number): void {
        for (let i: number = 0 ; i < this._childRef.length ; i++) {
            if (this._childRef[i].id === id) {
                this._childRef[i].ref.dispose();
                this._childRef.splice(i, 1);
                break;
            }
        }

        for (let i: number = 0 ; i < this.exercise.questions.length ; i++) {
            if (this.exercise.questions[i].id === id) {
                this.exercise.questions.splice(i, 1);
                break;
            }
        }
    }

    public onQuestionChange($event): void {
        let i: number;
        for (i = 0 ; i < this.exercise.questions.length ; i++) {
            if (this.exercise.questions[i].id === $event.id) {
                this.exercise.questions[i] = $event;
                break;
            }
        }

        if (i === this.exercise.questions.length)
            this.exercise.questions.push($event);
    }


    public onSubmit(): void {
        /* Save in database */
        if (this.exercise.id) {
            this._exerciseService.setOne(this.exercise);

            this._router.navigate(['Generator']);
        } else {
            this._exerciseService.addOne(this.exercise);
        }

        /* Reset the exercise */
        for (let i: number = 0 ; i < this._childRef.length ; i++) {
            this._childRef[i].ref.dispose();
        }

        this.ngOnInit();

    }

    private setUpEditor(exercise: Exercise): void {
        this.exercise = exercise;
        for (let i: number = 0; i < this.exercise.questions.length; i++) {
            this.addQuestion(this.exercise.questions[i]);
        }
    }
}

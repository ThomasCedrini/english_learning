import {Component, OnInit, Input, Output, ComponentRef,
        EventEmitter, DynamicComponentLoader, ElementRef} from 'angular2/core';

import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {NewQuestionComponent} from './newQuestion.component';
import {Exercise} from '../exercise/exercise';
import {RepositoryService} from '../database/repository.service';
import {ObjectCreatorService} from '../exercise/object.creator.service';

@Component({
    selector: 'generator',
    templateUrl : 'src/app/generator/generator.component.html',
    directives: [NewQuestionComponent],
    providers: [ObjectCreatorService]
})
export class GeneratorComponent implements OnInit {

    public exercise: Exercise;

    private _childRef: any[];
    private _nextId: number;

    constructor(private _dcl: DynamicComponentLoader,
                private _elementRef: ElementRef,
                private _repo: RepositoryService,
                private _objectCreator: ObjectCreatorService) {
    }

    public ngOnInit(): void {
        this._childRef = [];
        this._nextId = 0;

        this.exercise = this._objectCreator.createExercise();

        this.addQuestion();
    }

    public addQuestion(): void {
        this._dcl.loadIntoLocation(NewQuestionComponent, this._elementRef, 'newQuestion')
        .then(ref => {
            this._childRef.push({id: this._nextId, ref: ref});

            ref.instance.number = this._nextId;

            ref.instance.destroy.subscribe($event => {
                this.removeQuestion($event);
            });

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
        this._repo.addExercise(this.exercise);

        /* Reset the exercise */
        for (let i: number = 0 ; i < this._childRef.length ; i++) {
            this._childRef[i].ref.dispose();
        }

        this.ngOnInit();

    }
}

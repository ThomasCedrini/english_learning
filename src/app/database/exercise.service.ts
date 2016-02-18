import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {RepositoryService} from './repository.service';
import {Exercise} from '../exercise/exercise';
import {Type} from '../exercise/type';
import {ObjectCreatorService} from '../exercise/object.creator.service';

@Injectable()
export class ExerciseService {

    private _prefix: string = 'exercises/';
    private _typePrefix: string = 'types/';
    private _exerciseObservable: Observable<any>;

    private _types: any[];

    constructor(private _repository: RepositoryService,
                private _objectCreator: ObjectCreatorService) {

                    this._types = [];

                    this._repository.getChildren(this._typePrefix).subscribe(type => {
                        this._types.push({key: type.key, text: type.snapshot});
                    });
    }

    public get types(): Type[] {
        return this._types;
    }

    public setOne(exercise: Exercise) {
        this.addOrUpdateOne(exercise, false);
    }

    public addOne(exercise: Exercise) {
        this.addOrUpdateOne(exercise, true);
    }

    public getAll(): Observable<any> {
        return this.formatExercise(this._repository.getChildren(this._prefix));
    }

    public getOne(id: string): Observable<any> {
        return this.formatExercise(this._repository.getOneValue(this._prefix + id));
    }

    public deleteOne(id: string): void {
        this._repository.deleteValue(this._prefix + id);
    }

    private formatExercise(obs: Observable<any>): Observable<any> {
        return obs.map(data => {
            data.snapshot.id = data.key;

            return data.snapshot;
        })
        .map(data => {
            return this._objectCreator.createExercise(data);
        })
        .map(data => {
            var found: boolean = false;

            if (data.type) {
                for (let i: number = 0; i < this._types.length; i++) {
                    if (data.type === this._types[i].key) {
                        data.type = this._types[i];
                        found = true;
                    }
                }
            }

            if (!found)
                data.type = new Type();

            return data;
        });
    }

    private addOrUpdateOne(exercise: Exercise, add: boolean = false) {
        let id: string = exercise.id;
        if (exercise.hasOwnProperty('id'))
            delete exercise.id;

        if (exercise.type.hasOwnProperty('key')) {

            var found: boolean = false;

            for (let i: number = 0; i < this._types.length; i++) {

                if (exercise.type.key === this._types[i].key) {
                    exercise.type = this._types[i].key;
                    found = true;
                }
            }

            if (!found)
                delete exercise.type;

        }

        if (add) {
            this._repository.addChild(this._prefix, exercise);
        } else {
            this._repository.setValue(this._prefix + id, exercise);
        }
    }

}

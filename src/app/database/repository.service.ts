import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import {FIREBASE_URL} from '../firebase/config';

@Injectable()
export class RepositoryService {

    private _ref: Firebase;
    private _exerciseObservable: Observable<any>;

    constructor() {
        this._ref = new Firebase(FIREBASE_URL);
    }

    public deleteValue(path: string): void {
        this._ref.child(path).remove(error => {
            if (error)
                console.error('Delete value repository.service', error);
        });
    }

    public getValue(path: string): Observable<any> {
        return this.observe('value', this._ref.child(path));
    }
    public getOneValue(path: string): Observable<any> {
        return this.observe('value', this._ref.child(path), true);
    }
    public getChildren(path: string): Observable<any> {
        return  this.observe('child_added', this._ref.child(path));
    }

    public setValue(path: string, data: any): void {
        this._ref.child(path).set(data);
    }
    public addChild(path: string, data: any): void {
        this._ref.child(path).push(data);
    }

    private observe(eventType: string, ref: Firebase, once: boolean = false): Observable<any> {
        var observable = new Observable(observer => {
            var listener1;

            if (once) {
                listener1 = ref.once(eventType, snapshot => {
                    observer.next({
                        snapshot: snapshot.val(),
                        key: snapshot.key()
                    });

                }, error => {
                    observer.error(error);
                });
            } else {
                listener1 = ref.on(eventType, snapshot => {
                    observer.next({
                        snapshot: snapshot.val(),
                        key: snapshot.key()
                    });

                }, error => {
                    observer.error(error);
                });
            }

            return function() {
              ref.off(eventType, listener1);
            };
        });

        return observable;
    }
}

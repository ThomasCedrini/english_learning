import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';

import {QCM} from './qcm';
import {Answer} from './answer';
import {ObjectCreatorService} from '../object.creator.service';

@Component({
    selector: 'qcm-generator',
    templateUrl : 'src/app/exercise/QCM/generator.component.html',
    providers: [ObjectCreatorService]
})
export class GeneratorComponent implements OnInit {
    @Input() number: number;

    @Input() qcm: QCM;
    @Output() questionChange = new EventEmitter();

    public newItem: string;
    private _nextId: number;

    constructor(private _objectCreator: ObjectCreatorService) {}

    public ngOnInit(): void {
        if (!this.qcm) {
            this.qcm = this._objectCreator.createQcm();
            this.qcm.id = this.number;
            this._nextId = 0;
        } else {
            if (this.qcm.answers) {
                this._nextId = this.qcm.answers[this.qcm.answers.length - 1].id + 1;
            } else {
                this._nextId = 0;
                this.qcm.answers = [];
            }
        }
    }

    public addItem(): void {
        this.qcm.answers.push({id: this._nextId, text: this.newItem});
        this._nextId++;
        this.newItem = '';

        this.questionChange.emit(this.qcm);
    }

    public removeItem(id: number): void {
        for (let i: number = 0; i < this.qcm.answers.length; i++) {
            if (this.qcm.answers[i].id === id) {
                this.qcm.answers.splice(i, 1);

                if (this.qcm.answer === id)
                    this.qcm.answer = null;

                break;
            }
        }

        this.questionChange.emit(this.qcm);
    }

    public select(id: number): void {
        this.qcm.answer = id;
        this.questionChange.emit(this.qcm);
    }

    public blur(): void {
        this.questionChange.emit(this.qcm);
    }

}

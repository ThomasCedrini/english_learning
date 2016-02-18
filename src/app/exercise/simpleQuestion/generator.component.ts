import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';

import {SimpleQuestion} from './simpleQuestion';
import {ObjectCreatorService} from '../object.creator.service';

@Component({
    selector: 'question-generator',
    templateUrl: 'src/app/exercise/simpleQuestion/generator.component.html',
    providers: [ObjectCreatorService]
})
export class GeneratorComponent implements OnInit {
    @Input() number: number;
    @Input('simple-question') question: SimpleQuestion;

    @Output() questionChange = new EventEmitter();

    constructor(private _objectCreator: ObjectCreatorService) {}

    public ngOnInit(): void {
        if (!this.question) {
            this.question = this._objectCreator.createSimpleQuestion();
            this.question.id = this.number;
        }
    }

    public onChange(): void {
        this.questionChange.emit(this.question);
    }
}

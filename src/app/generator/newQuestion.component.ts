import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';

import {GeneratorComponent
    as QCMGenerator} from '../exercise/QCM/generator.component';

import {GeneratorComponent
    as QuestionGenerator} from '../exercise/simpleQuestion/generator.component';

import {GeneratorComponent
    as MediaGenerator} from '../exercise/media/generator.component';

import {QCM} from '../exercise/QCM/QCM';
import {SimpleQuestion} from '../exercise/simpleQuestion/simpleQuestion';
import {GapFill} from '../exercise/gapFill/gapFill';
import {Media} from '../exercise/media/media';

import {BASE_URL} from '../../config.ts';

@Component({
    selector: 'new-question',
    templateUrl : BASE_URL+'generator/newQuestion.component.html',
    directives: [QCMGenerator, QuestionGenerator, MediaGenerator]
})
export class NewQuestionComponent implements OnInit {
    @Input() number: number;
    @Output() destroy = new EventEmitter();

    @Input() question: (QCM|SimpleQuestion|GapFill|Media);
    @Output() questionChange = new EventEmitter();

    public type: string;

    public ngOnInit(): void {
        if (this.question)
            this.type = this.question.type;
    }

    public getData($event): void {
        this.questionChange.emit($event);
    }

    public ciao(): void {
        this.destroy.emit(this.number);
    }
}

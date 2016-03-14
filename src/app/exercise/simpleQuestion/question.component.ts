import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {SimpleQuestion} from './simpleQuestion';

import {BASE_URL} from '../../../config.ts';

@Component({
    selector: 'simple-question',
    templateUrl : BASE_URL+'exercise/simpleQuestion/question.component.html'
})
export class QuestionComponent {
    @Input('question') question: SimpleQuestion;

    @Input() score: number;
    @Output() scoreChange = new EventEmitter();

    public answered: string;
    public isSubmitted = false;
    public answerIsRight = false;

    public onSubmit(): void {
        this.isSubmitted = true;

        this.answerIsRight = this._formatText(this.answered) ===
                                this._formatText(this.question.answer);

        this.score += (this.answerIsRight) ? 1 : 0;
        this.scoreChange.emit(this.score);
    }

    private _formatText(input: string): string {
        input = input.trim().toUpperCase();

        if (input[input.length - 1] === '.')
            input = input.slice(0, -1);

        return input;
    }
}

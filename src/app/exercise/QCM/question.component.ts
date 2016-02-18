import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {QCM} from './QCM';

@Component({
    selector: 'QCM',
    templateUrl : 'src/app/exercise/QCM/question.component.html'
})
export class QuestionComponent {
    @Input('question') question: QCM;

    @Input() score: number;
    @Output() scoreChange = new EventEmitter();

    public answered: number;
    public isSubmitted = false;

    public choice(id: number): void {
        if (!this.isSubmitted) {
            this.answered = id;
            this.onSubmit();
        }
    }

    public onSubmit(): void {
        this.isSubmitted = true;
        this.score += (this.answered === this.question.answer) ? 1 : 0;

        this.scoreChange.emit(this.score);
    }
}

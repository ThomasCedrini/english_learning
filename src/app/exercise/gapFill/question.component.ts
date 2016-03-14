import {Component, Input, Output, EventEmitter,
        DynamicComponentLoader, ElementRef} from 'angular2/core';

import {GapFill} from './gapFill';
import {GapComponent} from './gap.component';

import {BASE_URL} from '../../../config.ts';

@Component({
    selector: 'gap-fill',
    templateUrl : BASE_URL+'exercise/gapFill/question.component.html'
})
export class QuestionComponent {
    @Input('question') question: GapFill;
    @Output() complete = new EventEmitter();

    public answered: string[] = [];
    public isSubmitted = false;
    public answerIsRight: boolean[];

    constructor(dcl: DynamicComponentLoader, elementRef: ElementRef) {
     // dcl.loadIntoLocation(GapComponent, elementRef, 'gap');
    }

    public onSubmit(): void {
        this.isSubmitted = true;
    }
}

import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Media} from './media';

import {BASE_URL} from '../../../config.ts';

@Component({
    selector: 'media',
    templateUrl : BASE_URL+'exercise/media/question.component.html'
})
export class QuestionComponent {
    @Input('question') media: Media;
}

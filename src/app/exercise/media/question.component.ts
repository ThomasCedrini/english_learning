import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Media} from './media';

@Component({
    selector: 'media',
    templateUrl : 'src/app/exercise/media/question.component.html'
})
export class QuestionComponent {
    @Input('question') media: Media;
}

import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';

import {Media} from './media';
import {ObjectCreatorService} from '../object.creator.service';

@Component({
    selector: 'media-generator',
    templateUrl: 'src/app/exercise/media/generator.component.html',
    providers: [ObjectCreatorService]
})
export class GeneratorComponent implements OnInit {
    @Input() number: number;
    @Input() media: Media;

    @Output() questionChange = new EventEmitter();

    constructor(private _objectCreator: ObjectCreatorService) {}

    public ngOnInit(): void {
        if (!this.media) {
            this.media = this._objectCreator.createMedia();
            this.media.id = this.number;
        }
    }

    public onChange(): void {
        this.questionChange.emit(this.media);
    }
}

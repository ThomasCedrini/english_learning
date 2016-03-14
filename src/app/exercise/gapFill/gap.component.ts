import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {GapFill} from './gapFill';

import {BASE_URL} from '../../../config.ts';

@Component({
    selector: 'gap',
    templateUrl : BASE_URL+'exercise/gapFill/gap.component.html'
})
export class GapComponent {
    @Input("number") number:number;
    @Output() update = new EventEmitter();

    public answered:string;

    public onBlur():void {
        this.update.emit(this.answered);
    }
}

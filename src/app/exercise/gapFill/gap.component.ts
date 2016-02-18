import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {GapFill} from './gapFill';

@Component({
    selector: 'gap',
    templateUrl : 'src/app/exercise/gapFill/gap.component.html'
})
export class GapComponent {
    @Input("number") number:number;
    @Output() update = new EventEmitter();

    public answered:string;

    public onBlur():void {
        this.update.emit(this.answered);
    }
}

import {QCM} from './QCM/QCM';
import {SimpleQuestion} from './simpleQuestion/simpleQuestion';
import {GapFill} from './gapFill/gapFill';
import {Type} from './type';

export class Exercise {
    public id: string;
    public questions: (QCM|SimpleQuestion|GapFill)[];
    public title: string;
    public type: Type;
    public orders: string;

    constructor() {
        this.id = null;
        this.questions = [];
        this.title = null;
        this.type = new Type();
        this.orders = null;
    }

    maxScore(): number {
        var score: number = 0;
        for (let i: number = 0; i < this.questions.length; i++) {
            if (this.questions[i].type !== 'media') score++;
        }

        return score;
    }
}

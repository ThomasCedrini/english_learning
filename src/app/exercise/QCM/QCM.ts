import {Answer} from './answer';

export interface QCM {
    id:number;
    text:string;
    type:string;

    answer:number;
    answers: Answer[];
}

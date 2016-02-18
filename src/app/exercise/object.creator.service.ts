import {Injectable} from 'angular2/core';

import {QCM} from './QCM/QCM';
import {Answer} from './QCM/Answer';
import {SimpleQuestion} from './simpleQuestion/simpleQuestion';
import {GapFill} from './gapFill/gapFill';
import {Exercise} from './exercise';
import {Media} from './media/media';


@Injectable()
export class ObjectCreatorService {
    public createQcmAnswer(): Answer {
        return {
            id: null,
            text: null
        };
    }

    public createQcm(): QCM {
        return {
            id: null,
            text: null,
            type: 'QCM',
            answer: null,
            answers: []
        };
    }

    public createSimpleQuestion(): SimpleQuestion {
        return {
            id: null,
            text: null,
            type: 'question',
            answer: null
        };
    }

    // The exercise argument is here to transform an object whose interface is like exercise
    // into an exercise object to enjoy all of its functions
    public createExercise(exercise?: Exercise): Exercise {
        let newExercise: Exercise = new Exercise();
        if (exercise) {
            if (exercise.id)
                newExercise.id = exercise.id;
            if (exercise.questions)
                newExercise.questions = exercise.questions;
            if (exercise.title)
                newExercise.title = exercise.title;
            if (exercise.type)
                newExercise.type = exercise.type;
        }
        return newExercise;
    }

    public createMedia(): Media {
        return {
            id: null,
            type: 'media',
            title: null,
            text: null,
            video: null,
            picture: null
        };
    }
}

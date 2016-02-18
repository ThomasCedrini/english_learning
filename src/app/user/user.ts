import {ROLES} from './user.provider.service';

export class User {
    public id: string;
    public username: string;
    public exercises: number[];
    public roles: string[];

    constructor() {
        this.id = null;
        this.username = null;
        this.exercises = [];
        this.roles = [ROLES.GUEST];
    }

    public isExerciseDone(id: number): boolean {
        return this.exercises[id] !== undefined;
    }

    public getScore(id: number): number {
        if (this.isExerciseDone(id)) {
            return this.exercises[id];
        } else
            return 0;
    }

    public hasRole(role: string): boolean {
        for (let i: number = 0; i < this.roles.length; i++) {
            if (this.roles[i] === role)
                return true;
        }

        return false;
    }
}

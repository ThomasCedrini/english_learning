export class Answer {
    public id:number;
    public text: string;

    constructor(id:number, text:string=null) {
        this.id=id;
        this.text=text;
    }
}

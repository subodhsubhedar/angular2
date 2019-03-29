import { Book } from "../books/book";


export class Subject {
    subjectId: number;
    durationInHrs: number;
    subtitle: string;

    constructor(subjectId: number,
        durationInHrs: number,
        subtitle: string
    ) {

        this.subjectId = subjectId;
        this.durationInHrs = durationInHrs;
        this.subtitle = subtitle;

    }


    public toString(): string {
        return "[ subjectId:" + this.subjectId + "  subtitle:" + this.subtitle + "  durationInHrs:" + this.durationInHrs + "  ]";
    }

}
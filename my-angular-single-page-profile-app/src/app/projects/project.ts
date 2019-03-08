export class Project {
    projectName: string;
    projectDesc: string;

    constructor(prjName: string, prjDesc: string) {
        this.projectName = prjName;
        this.projectDesc = prjDesc;
    }

    public toString(): string {
        return this.projectName;
    }

}
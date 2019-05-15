
export class ParentTask {

    parentTaskId: number;
    parentTaskDesc: string;


    constructor(parentTskId: number,
        parentTaskDsc: string
    ) {

        this.parentTaskId = parentTskId;
        this.parentTaskDesc = parentTaskDsc;
    }


    public toString(): string {
        return "[ parentTaskId:" + this.parentTaskId + "  parentTaskDesc:" + this.parentTaskDesc + "  ]";
    }

}
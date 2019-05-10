
export class ParentTask {

    parentId: number;
    parentTaskDesc: string;


    constructor(parentTskId: number,
        parentTaskDsc: string
    ) {

        this.parentId = parentTskId;
        this.parentTaskDesc = parentTaskDsc;
    }


    public toString(): string {
        return "[ parentTaskId:" + this.parentId + "  parentTaskDesc:" + this.parentTaskDesc + "  ]";
    }

}
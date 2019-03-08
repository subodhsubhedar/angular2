export class Contact {

    salutation: string;
    userName: string;
    mobileNum: number;
    email: string;

    remarks: string;

    constructor(userNm: string, mobNum: number, emailAddrss: string, remrks: string) {
        this.userName = userNm;
        this.mobileNum = mobNum;
        this.email = emailAddrss;
        this.remarks = remrks;
    }

    public toString(): string {
        return "\n User name: " + this.userName + "\n Mob num : " + this.mobileNum + "\n Email : " + this.email
            + "\n Remarks : " + this.remarks;
    }

}
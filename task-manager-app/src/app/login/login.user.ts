export class UserModel {

    username: string;
    password: string;

    constructor(usernm: string,
        pwd: string) {
        this.username = usernm;
        this.password = pwd;
    }

}
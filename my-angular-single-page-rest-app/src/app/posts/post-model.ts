import { IPost } from './post';
export class Post implements IPost {


    constructor(
        public userId: number,
        public id: number,
        public title: string,
        public body: string

    ) {

    }
}
import { Post } from './post-model';
import { IPost } from './post';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'post-add.component.html',
    styleUrls: ['../app.component.css']
})
export class AddPostComponent implements OnInit {

    post: IPost= new Post(0,0,"default title","default content");



    constructor() { }

    ngOnInit() {

    }

    addPost() {
        console.log('post received :' + this.post.title);
    }

} 
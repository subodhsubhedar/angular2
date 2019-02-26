import { StatusMsgEmitterService } from './../common/status-msg.emitter.service';
import { PostsService } from './posts.service';
import { Post } from './post-model';
import { IPost } from './post';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    templateUrl: 'post-add.component.html',
    styleUrls: ['../app.component.css']
})
export class AddPostComponent implements OnInit {

    post: IPost= new Post(null,null,null,null);

    flow : string = "add";

    constructor(private postsService : PostsService, private router : Router,
         private statusMsgService : StatusMsgEmitterService ) { 
            this.statusMsgService.notifyMsg('');
         }

    ngOnInit() {

    }

    addNewPost(post : IPost):void {
        console.log('post received :' + this.post.title);
        this.postsService.addPost(this.post).subscribe(res => {
                console.log("add new post done success!! ..");    
                 });
        console.log('New Post'+ this.post.title+'added Successfully.');
        //this.notify.emit('New Post');
        this.statusMsgService.notifyMsg('New Post : "'+ this.post.title+'" added Successfully.');
                 
        this.router.navigate(['/home']);
    }

} 
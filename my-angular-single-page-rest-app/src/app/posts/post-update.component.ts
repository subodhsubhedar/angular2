import { PostsService } from './posts.service';
import { Post } from './post-model';
import { IPost } from './post';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusMsgEmitterService } from '../common/status-msg.emitter.service';

@Component({
    templateUrl: 'post-add.component.html',
    styleUrls: ['../app.component.css']
})
export class UpdatePostComponent implements OnInit {

    post: IPost = new Post(null, null, null, null);

    flow: string = "update";

    constructor(private postsService: PostsService, private router: Router,
        private route: ActivatedRoute, private statusMsgService: StatusMsgEmitterService) {
        this.statusMsgService.notifyMsg('');
    }
    ngOnInit() {
        this.post = this.route.snapshot.data['post'];
    }

    updatePost(post: IPost): void {
        console.log('post received :' + this.post.title);
        this.postsService.updatePost(this.post).subscribe(res => {
            console.log("add new post done success!! .." + res);
        });

        this.statusMsgService.notifyMsg('Post : " ' + this.post.title + '" updated Successfully.');

        this.router.navigate(['/home']);
    }

} 
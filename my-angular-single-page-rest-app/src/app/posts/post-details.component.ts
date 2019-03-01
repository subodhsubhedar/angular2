import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from './posts.service';
import { IPost } from './post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'post-details.component.html',
    styleUrls: ['../app.component.css']
})
export class PostDetailsComponent implements OnInit {
    post: IPost;
    errorMsg: string;

    idPost: number;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
    
        this.post = this.route.snapshot.data['post'];

    }

    onBack(): void {
        this.router.navigate(['/posts']);
    }

    


} 
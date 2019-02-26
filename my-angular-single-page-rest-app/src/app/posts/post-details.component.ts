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
    /*        let id = +this.route.snapshot.paramMap.get("id");
        this.idPost = id;
        this.postsService.findPostById(id).subscribe(
            postFoundById => this.post = postFoundById,
            error => this.errorMsg = <any>error
        );*/
        this.post = this.route.snapshot.data['post'];

    }

    onBack(): void {
        this.router.navigate(['/posts']);
    }

} 
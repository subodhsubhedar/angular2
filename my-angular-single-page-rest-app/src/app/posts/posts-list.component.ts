import { StatusMsgEmitterService } from './../common/status-msg.emitter.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IPost } from './post';
import { PostsService } from './posts.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl: './posts-list.component.html',
    styleUrls: ['../app.component.css']
})
export class PostsListComponent implements OnInit {

    //showPosts: boolean = false;

    _postsListFilter: string;

    posts: IPost[];

    filteredPosts: IPost[];

    errorMsg: string;

    constructor(private postsService: PostsService, private route: ActivatedRoute, 
        private router: Router, private statusMsgService : StatusMsgEmitterService) {
        this._postsListFilter = "";
        this.posts = route.snapshot.data['postsList'];
        this.filteredPosts = this.posts;

        this.statusMsgService.notifyMsg('');
    }
    ngOnInit(): void { }

    get postsListFilter(): string {
        return this._postsListFilter;
    }
    set postsListFilter(value: string) {
        this._postsListFilter = value;
        this.filteredPosts = this.postsListFilter ? this.performFilter(this._postsListFilter) : this.posts;
    }


    performFilter(filterBy: string): IPost[] {
        filterBy = filterBy.toLowerCase();
        return this.posts.filter((post: IPost) => post.title.toLowerCase().indexOf(filterBy) != -1);

    }
    onDelete(id: number): void {
        let deleteTitle = (this.posts.find(obj => obj.id == id)).title;
        var answer = confirm("Are you sure you want to delete : " + deleteTitle);
        if (answer) {
            console.log('calling delete for : ' + id);

            this.postsService.deletePost(id).subscribe(res => {
                console.log('Delete done callback ' + JSON.stringify(res));
                this.posts = res;
                this.filteredPosts = res;
            });

            console.log('Delete performed successfully ');
            this.statusMsgService.notifyMsg('Post with title : "'+ deleteTitle+ '" deleted successfully.');
        }
    }

    onEdit(id: number): void {
        console.log('calling update post with id :' + id);
        this.router.navigate(['/updatePost', id]);

    }
}

import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IPost } from './post';
import { PostsService } from './posts.service';
import { post } from 'selenium-webdriver/http';


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

    @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor(private postsService: PostsService) {
        this._postsListFilter = "";

    }

    ngOnInit(): void {
        this.postsService.findAllPosts().subscribe(posts => {
            this.posts = posts;
            this.filteredPosts = this.posts;
        },
            error => this.errorMsg = <any>error);

    }

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

    onButtonClick(userAction: string): void {
        this.buttonClicked.emit(userAction + 'Clicked');
    }


    onDelete(id: number): void {
        console.log('calling delete for : ' + id);


        this.postsService.deletePost(id).subscribe(res => 
            console.log("delete .." + res.title));

        console.log('Delete done ');

    }
}

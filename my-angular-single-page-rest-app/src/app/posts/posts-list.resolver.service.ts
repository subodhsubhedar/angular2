import { PostsService } from './posts.service';
import { IPost } from './post';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PostsResolverService implements Resolve<IPost[]> {
    
    constructor(private  postsService : PostsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPost[]>{
        return this.postsService.findAllPosts();
    }

}
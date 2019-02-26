import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from './post';
import { PostsService } from './posts.service';

@Injectable({
    providedIn : 'root'
}
)
export class PostDetailsActivateGuard implements CanActivate, Resolve<IPost> {

    constructor(private router : Router,private  postsService : PostsService){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean {
        
        let id = +route.paramMap.get("id");

        if(isNaN(id) || id<1){
            alert("Invalid post id :"+id);
            this.router.navigate(['/posts']);
            return false;
        }else{

            return true;
        }
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPost> {
        let id = +route.paramMap.get("id");
       
        return this.postsService.findPostById(id);
    }



}
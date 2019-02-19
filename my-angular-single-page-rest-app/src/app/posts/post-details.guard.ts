import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn : 'root'
}
)
export class PostDetailsActivateGuard implements CanActivate {

    constructor(private router : Router){}

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

}
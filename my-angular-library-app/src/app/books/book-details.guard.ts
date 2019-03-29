import { LibraryBookService } from './../service/library-book.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
    providedIn: 'root'
})

export class BookDetailsActivateGuard implements CanActivate, Resolve<Book> {

    constructor(private libraryBookService: LibraryBookService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Book | Observable<Book> | Promise<Book> {
        let bookId = +route.paramMap.get("bookId");
        console.log("BookDetailsActivateGuard , book id :"+bookId);

        return this.libraryBookService.findBookById(bookId);
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        let bookId = +route.paramMap.get("bookId");

        console.log("BookDetailsActivateGuard, Can activate ? :"+bookId);

        if (isNaN(bookId) || bookId < 1) {
            alert("Invalid Book id :" + bookId);
            this.router.navigate(['/listAllBooks']);
            return false;
        } else {

            return true;
        }

    }

}
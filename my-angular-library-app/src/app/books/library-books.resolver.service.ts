import { LibraryBookService } from './../service/library-book.service';
import { Book } from './book';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LibraryBooksResolverService implements Resolve<Book[]> {

    constructor(private libraryBookService: LibraryBookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> {
        return this.libraryBookService.findAllBooks();
    }
}
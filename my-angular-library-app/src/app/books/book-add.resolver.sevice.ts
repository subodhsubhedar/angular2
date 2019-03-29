import { Subject } from './../subject/subject';
import { LibraryBookService } from './../service/library-book.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LibraryAddBookResolverService implements Resolve<Subject[]> {

    constructor(private libraryBookService: LibraryBookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subject[]> {
        return this.libraryBookService.findAllSubjects();

    }
}
import { Subject } from './../subject/subject';
import { LibraryBookService } from '../service/task-manager.service';
import { Injectable } from './node_modules/@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from './node_modules/@angular/router';
import { Observable } from './node_modules/rxjs/internal/Observable';

@Injectable()
export class LibraryAddBookResolverService implements Resolve<Subject[]> {

    constructor(private libraryBookService: LibraryBookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<Subject[]> {
        return this.libraryBookService.findAllSubjects();

    }
}
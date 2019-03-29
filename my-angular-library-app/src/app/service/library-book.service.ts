import { Subject } from './../subject/subject';
import { Book } from './../books/book';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LibraryBookService {
    private libraryUrl: string = "http://localhost:8081/spring-rest-ws-spring-data-demo-library/library/";

    constructor(private http: HttpClient) { }

    findAllBooks(): Observable<Book[]> {
        console.log("calling LibraryBookService remote rest ws ...")
        return this.http.get<Book[]>(this.libraryUrl + "books").pipe
            (tap(data => console.log(JSON.stringify(data))));
    }


    findAllSubjects(): Observable<Subject[]> {
        console.log("calling LibraryBookService remote rest ws ...")
        return this.http.get<Subject[]>(this.libraryUrl + "subjects").pipe
            (tap(data => console.log(JSON.stringify(data))));
    }



    findBookById(bookId: number): Observable<Book> {
        console.log("finding book by id : " + bookId);
        return this.http.get<Book>(this.libraryUrl + "book/" + bookId).
            pipe(tap(data => console.log('http get by id responded')));
    }


    addBook(book: Book): Observable<Book> {
        console.log("Calling http post...");
        console.log('REQUEST TO ADD JSON :' + JSON.stringify(book))

        return this.http.post<Book>(this.libraryUrl + "book/add", book).
            pipe(tap(data => console.log('http post responded, data added succesfully :' + data)));
    }


    updateBook(book: Book): Observable<Book> {
        console.log("Calling http update...");
        console.log('REQUEST TO ADD JSON :' + JSON.stringify(book))

        return this.http.put<Book>(this.libraryUrl + "book/update", book).
            pipe(tap(data => console.log('http put responded, data updated succesfully :' + data)));
    }


    deleteBook(id: number): Observable<any> {
        return this.http.delete<Book>(this.libraryUrl + "book/delete/" + id).pipe(
            tap(data => console.log('deleted POST id tapped =' + id)),
        );


    }

}
import { Injectable } from '@angular/core';
import { IPost } from './post';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable(

)
export class PostsService {
    private postsUrl: string = "https://jsonplaceholder.typicode.com/posts";

    constructor(private http: HttpClient) { }

    findAllPosts(): Observable<IPost[]> {

        return this.http.get<IPost[]>(this.postsUrl).pipe
            (tap(data => console.log(JSON.stringify(data))));

    }

    findPostById(id: number): Observable<IPost> {

        return this.http.get<IPost>(this.postsUrl + "/" + id).
            pipe(tap(data => console.log(JSON.stringify(data))));
    }

    addPost(post: IPost) {

    }

    updatePost(post: IPost) {

    }

    deletePost(id: number): Observable<IPost> {

        return this.http.delete<IPost>(this.postsUrl + "/" + id).pipe(
            tap(_ => console.log('deleted POST id='+id)),
            catchError(this.handleError<IPost>('delete ERROR'))
        );

    }

    handleError1(err: HttpErrorResponse) {
        console.log('error occured :' + err.message);
    }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}   
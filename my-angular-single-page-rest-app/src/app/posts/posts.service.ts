import { Injectable } from '@angular/core';
import { IPost } from './post';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable(

)
export class PostsService {
    //private postsUrl: string = "https://jsonplaceholder.typicode.com/posts";
    //private postsUrl: string ="assets/api/mock-rest-service-data.json";
    private postsUrl: string =  "http://localhost:3000/posts";

    constructor(private http: HttpClient) { }

    findAllPosts(): Observable<IPost[]> {

        return this.http.get<IPost[]>(this.postsUrl).pipe
            (tap(data => console.log(JSON.stringify(data))));

    }

    findPostById(id: number): Observable<IPost> {
        console.log("finding post by id : "+id);
        return this.http.get<IPost>(this.postsUrl + "/" + id).
            pipe(tap(data => console.log('http get by id responded')));
    }

    addPost(post: IPost): Observable<IPost[]> {
        console.log("Calling http post...");
        return this.http.post<IPost[]>(this.postsUrl, post).
            pipe(tap(data => console.log('http post responded')));
    }



    updatePost(post: IPost):Observable<IPost[]> {
        return this.http.put<IPost[]>(this.postsUrl , post).pipe(
            tap(_ => console.log('updated POST ' + post)),
            catchError(this.handleError<IPost[]>('UPDATE ERROR'))
        );
    }

    deletePost(id: number): Observable<IPost[]> {
        return this.http.delete<IPost[]>(this.postsUrl + "/" + id).pipe(
            tap(_ => console.log('deleted POST id=' + id)),
            catchError(this.handleError<IPost[]>('delete ERROR'))
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
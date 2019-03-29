import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './book';

@Component({
    templateUrl: 'book-details.component.html'
})
export class BookDetailsComponent implements OnInit {

    book: Book;
    errorMsg: string;

    bookID: number;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {

        this.book = this.route.snapshot.data['book'];

    }

    onBack(): void {
        this.router.navigate(['/listAllBooks']);
    }


}
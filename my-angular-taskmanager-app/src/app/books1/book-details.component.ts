import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './book';
import { StatusMsgEmitterService } from '../common/status-msg-emitter.service';

@Component({
    templateUrl: 'book-details.component.html'
})
export class BookDetailsComponent implements OnInit {

    book: Book;
    errorMsg: string;

    bookID: number;

    constructor(private route: ActivatedRoute, private router: Router, private statusMsgService: StatusMsgEmitterService) {

    }

    ngOnInit() {

        this.book = this.route.snapshot.data['book'];

    }

    onBack(): void {
        this.router.navigate(['/listAllBooks']);
    }


}
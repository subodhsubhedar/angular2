import { LibraryBookService } from '../service/library-book.service';
import { Book } from "./book";
import { Router, ActivatedRoute } from '@angular/router';
import { StatusMsgEmitterService } from '../common/status-msg-emitter.service';
import { OnInit, Component } from '@angular/core';
import { Subject } from '../subject/subject';

@Component({
    templateUrl: 'book-add-update.component.html',

})
export class AddUpdateBookComponent implements OnInit {

    book: Book = new Book(0, null, 0, 0, null, new Subject(0, 0, null));

    flow: string = "";

    subjectList: Subject[];
    defaultSubjId: number;

    constructor(private libraryBookService: LibraryBookService, private router: Router,
        private statusMsgService: StatusMsgEmitterService, private route: ActivatedRoute) {

        this.subjectList = route.snapshot.data["subjectsList"];
        console.log("subjectList : " + this.subjectList);

        if (this.route.snapshot.data['book']) {
            this.book = this.route.snapshot.data['book'];
        }
        console.log("book retrieved : " + this.book.toString());

        if (this.book.bookId == 0) {
            this.flow = "add";
            this.defaultSubjId = 0;
        } else {
            this.flow = "update";
        }

        this.statusMsgService.notifyMsg('');
    }

    ngOnInit() {

    }

    addNewBook(book: Book): void {
        console.log('Add request received for Book :' + this.book.title);

        console.log('book obj is :' + book.toString());

        this.libraryBookService.addBook(this.book).subscribe(res => {
            console.log("add new Book done success!! ..");
            this.statusMsgService.notifyMsg('New Book : "' + res.title + '" added Successfully.');
            this.router.navigate(['/getBook', res.bookId]);
        });

    }

    updateBook(book: Book): void {
        this.libraryBookService.updateBook(this.book).subscribe(res => {
            console.log("Update Book done successfully !! ..");
            this.statusMsgService.notifyMsg('Book : "' + res.title + '" updated Successfully.');
            this.router.navigate(['/getBook', res.bookId]);
        });

    }

}  
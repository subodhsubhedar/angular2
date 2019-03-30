import { LibraryBookService } from '../service/library-book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { StatusMsgEmitterService } from '../common/status-msg-emitter.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
    templateUrl: 'library-books.component.html'
})
export class LibraryBooksComponent implements OnInit {

    allBooksList: Book[];

    _booksListFilter: string;

    filteredBooks: Book[];
    ngOnInit() {

    }

    constructor(private libraryBookService: LibraryBookService, private route: ActivatedRoute,
        private router: Router, private statusMsgService: StatusMsgEmitterService) {
        console.log("Calling libraryBookService");

        this.allBooksList = route.snapshot.data['booksList'];

        this._booksListFilter = "";
        this.filteredBooks = this.allBooksList;
        this.statusMsgService.notifyMsg('');

    }


    get booksListFilter(): string {
        return this._booksListFilter;
    }

    set booksListFilter(value: string) {
        this._booksListFilter = value;
        this.filteredBooks = this._booksListFilter ? this.performFilter(this._booksListFilter) : this.allBooksList;
    }

    performFilter(filterBy: string): Book[] {
        filterBy = filterBy.toLowerCase();
        return this.allBooksList.filter((book: Book) => book.title.toLowerCase().indexOf(filterBy) != -1);

    }

    onDelete(book: Book): void {
        let deleteTitle = book.title;
        var answer = confirm("Are you sure you want to delete : " + deleteTitle);
        if (answer) {
            console.log('calling delete for : ' + book.bookId);

            this.libraryBookService.deleteBook(book.bookId).subscribe(res => {
                console.log('Delete done callback ' + JSON.stringify(res));
                console.log('Delete performed successfully ');
                this.statusMsgService.notifyMsg('Book with title : "' + deleteTitle + '" deleted successfully.');

                //refresh the model
                this.libraryBookService.findAllBooks().subscribe(bookListData => {
                    this.allBooksList = bookListData;
                    this.filteredBooks = this.allBooksList;
                })
            });
        }
    }

    onEdit(id: number): void {
        this.router.navigate(['/updateBook', id]);
    }

}
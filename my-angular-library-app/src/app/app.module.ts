import { LibraryBooksResolverService } from './books/library-books.resolver.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation/nav.component';
import { StatusMsgEmitterService } from './common/status-msg-emitter.service';
import { LibraryBooksComponent } from './books/library-books.component';
import { LibraryBookService } from './service/library-book.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookDetailsComponent } from './books/book-details.component';
import { BookDetailsActivateGuard } from './books/book-details.guard';
import { AddUpdateBookComponent } from './books/book-add-update.component';
import { LibraryAddBookResolverService } from './books/book-add.resolver.sevice';
import { HomeComponent } from './home/home.component';
import { LibraryHttpErrorInterceptor } from './common/library.error.service';

@NgModule({
  declarations: [
    AppComponent, NavigationBarComponent,
    LibraryBooksComponent, BookDetailsComponent, AddUpdateBookComponent, HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot([
      {
        path: 'listAllBooks',
        component: LibraryBooksComponent,
        resolve: { booksList: LibraryBooksResolverService },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'addNewBook',
        component: AddUpdateBookComponent,
        resolve: { subjectsList: LibraryAddBookResolverService },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'getBook/:bookId',
        component: BookDetailsComponent,
        canActivate: [BookDetailsActivateGuard],
        resolve: { book: BookDetailsActivateGuard },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'updateBook/:bookId',
        component: AddUpdateBookComponent,
        canActivate: [BookDetailsActivateGuard],
        resolve: { subjectsList: LibraryAddBookResolverService, book: BookDetailsActivateGuard },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }

    ]
    )],
  providers: [StatusMsgEmitterService,
    LibraryBookService,
    LibraryBooksResolverService,
    LibraryAddBookResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LibraryHttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostsListComponent } from './posts/posts-list.component';
import { PostsService } from './posts/posts.service';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { PostDetailsComponent } from './posts/post-details.component';
import { PostDetailsActivateGuard } from './posts/post-details.guard';
import { AddPostComponent } from './posts/post-add.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, PostsListComponent, PostDetailsComponent,AddPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'posts', component: PostsListComponent },
      { path: 'posts/:id', canActivate: [PostDetailsActivateGuard], component: PostDetailsComponent },
      { path: 'addPost', component: AddPostComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'home' },
      { path: '', pathMatch: 'full', redirectTo: 'home' }
    ]
    )],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { } 

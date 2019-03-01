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
import { PostsResolverService } from './posts/posts-list.resolver.service';
import { UpdatePostComponent } from './posts/post-update.component';
import { StatusMsgEmitterService } from './common/status-msg.emitter.service';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, PostsListComponent, PostDetailsComponent, AddPostComponent,UpdatePostComponent
  ], 
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { 
        path: 'home', 
        component: HomeComponent 
      },
      { 
        path: 'posts', 
        component: PostsListComponent, 
        resolve: { postsList: PostsResolverService } 
      },
      { 
        path: 'posts/:id', 
        canActivate: [PostDetailsActivateGuard], 
        resolve: { post: PostDetailsActivateGuard }, 
        component: PostDetailsComponent 
      },
      { 
        path: 'addPost', 
        component: AddPostComponent 
      },
      { 
        path: 'updatePost/:id', 
        canActivate: [PostDetailsActivateGuard], 
        resolve: { post: PostDetailsActivateGuard }, 
        component: UpdatePostComponent 
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
  providers: [PostsService, PostsResolverService,StatusMsgEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { } 

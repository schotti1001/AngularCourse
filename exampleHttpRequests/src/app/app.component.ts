import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isLoading = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient,
            private postService: PostService) {}

  ngOnInit() {
    this.errorSub =  this.postService.error.subscribe((error) => this.error = error);

    this.isLoading =true;
    this.postService.fetchPosts().subscribe(posts => {
        this.isLoading=false;
        this.loadedPosts = posts;
    }, error => {
        this.isLoading = false;
        this.error = error.message
    });
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading =true;
    this.postService.fetchPosts().subscribe(posts => {
        this.isLoading=false;
        this.loadedPosts = posts;
    }, error => {
        this.error = error.message;

    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deleteAll().subscribe(result => this.loadedPosts=[]);
  }

 
}

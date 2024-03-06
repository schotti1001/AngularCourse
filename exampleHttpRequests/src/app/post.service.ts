import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService{
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>('https://angular-course-f7b9e-default-rtdb.firebaseio.com/posts.json'
        , postData).subscribe(responseData => {
            console.log(responseData);
        }, error => {
            this.error.next(error);
        });
    }

    fetchPosts(){
       return this.http.get<{[key:string]: Post}>('https://angular-course-f7b9e-default-rtdb.firebaseio.com/posts.json')
        .pipe(map((responseData) => {
            const postArray: Post[] = [];
            for(const key in responseData) {
                if(responseData.hasOwnProperty(key))
                postArray.push({...responseData[key], id: key});
            }
            return postArray;
        }), catchError(errorRe => {
            //Send to analytics server
            return throwError(errorRe);
        }));
    }

    deleteAll(){
        return this.http.delete('https://angular-course-f7b9e-default-rtdb.firebaseio.com/posts.json');
    }
}
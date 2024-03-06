import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService{
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>(
            'https://angular-course-f7b9e-default-rtdb.firebaseio.com/posts.json'
        , postData,
        { observe: 'response'}
        ).subscribe(responseData => {
            console.log(responseData);
        }, error => {
            this.error.next(error);
        });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty'); //required in case of multiple params

       return this.http.get<{[key:string]: Post}>('https://angular-course-f7b9e-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({"Custom-Header": 'Hello'}),
            params: searchParams
        })
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
        return this.http.delete('https://angular-course-f7b9e-default-rtdb.firebaseio.com/posts.json', {
            observe: 'events',
            responseType: 'json'
        }).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response) {
                console.log(event.body)
            }
        }));
    }
}
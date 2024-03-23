import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, map, take } from "rxjs";
import { Store } from "@ngrx/store";
import { user } from "./store/auth.selectors";
import { AppState } from "../store/app.reducer";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(user).pipe(take(1), 
        exhaustMap(user => {
            if(!user) {
                return next.handle(req);
            }
            const modifiedRequest = req.clone({params: new HttpParams().set('auth', user.token)})
            return next.handle(modifiedRequest);
        }))
    } 
}
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, reduce, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registred?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    

    constructor(private http: HttpClient){}
    
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo4EV1_zMW22v7UGZlcUkf8TJ-5dZx-sY',
        {
            'email': email,
            'password': password,
            'returnSecureToken': true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string ){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo4EV1_zMW22v7UGZlcUkf8TJ-5dZx-sY', 
        {
            'email': email,
            'password': password,
            'returnSecureToken': true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    signOut(){
        this.user.next(null);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number ){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
        const userData : 
        {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

    private handleError(errRespone: HttpErrorResponse){
        let errorMessage = 'An unknown error occured!';
            if(!errRespone.error || !errRespone.error.error){
                return throwError(errorMessage);
            }
            switch(errRespone.error.error.message) {
                case 'EMAIL_EXISTS': 
                    errorMessage = 'This email exists already';
                    break;
                case 'EMAIL_NOT_FOUND': 
                    errorMessage = 'This email does not exist';
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                case 'INVALID_PASSWORD': 
                    errorMessage = 'Invalid login data';
                    break;
            }
            return throwError(errorMessage);
    }
}
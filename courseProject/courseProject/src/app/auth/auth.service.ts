import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

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
    constructor(private http: HttpClient){}
    
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo4EV1_zMW22v7UGZlcUkf8TJ-5dZx-sY',
        {
            'email': email,
            'password': password,
            'returnSecureToken': true
        }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string ){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo4EV1_zMW22v7UGZlcUkf8TJ-5dZx-sY', 
        {
            'email': email,
            'password': password,
            'returnSecureToken': true
        }).pipe(catchError(this.handleError));
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
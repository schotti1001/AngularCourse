import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { authSuccess, authFailed, loginStart, signUpStart, logout, autoLogin } from "./auth.actions";
import { catchError, map, of, switchMap, tap, } from "rxjs";
import { AuthResponseData, AuthService } from "../auth.service";
import { HttpClient, } from "@angular/common/http";
import { User } from "../user.model";
import { environment } from "../../../environment/environment";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

    authLogin = createEffect(() => this.actions$.pipe(
        ofType(loginStart),
        switchMap((authData) => {

            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, 
            {
                'email': authData.email,
                'password': authData.password,
                'returnSecureToken': true
            }).pipe(
                tap(resData => {
                    this.authService.autoLogout(+resData.expiresIn *1000)
                }),
                map(resData => {
                    return this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);        
                }),
                catchError(errRespone => {
                    return this.handleError(errRespone);
            }),
            );
        }),
    ));


    authRedirect = createEffect(() => this.actions$.pipe(
        ofType(authSuccess),
        tap(authSuccessAction => {
            if(authSuccessAction.redirect){
                this.router.navigate(['/'])
            }
        }),
    ), {dispatch: false})

    authSignup = createEffect(() => this.actions$.pipe(
        ofType(signUpStart),
        switchMap((authData) => {
            return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            {
                'email': authData.email,
                'password': authData.password,
                'returnSecureToken': true
            }).pipe( 
                tap(resData => {
                    this.authService.autoLogout(+resData.expiresIn *1000)
                }),
                map(resData => {
                return this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }),
                catchError(errResponse => {
                    return this.handleError(errResponse);
                })
            );
        })
    ))

    authLogout = createEffect(() => this.actions$.pipe(
        ofType(logout),
        tap(() => {
            this.authService.clearTokenExpirationTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    ), {dispatch: false})


    autoLogin = createEffect(() => this.actions$.pipe(
        ofType(autoLogin),
        map(() => {
            const userData : 
            {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));
        
            if(!userData) {
                return { type: 'DUMMY'};
            }
        
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
            if(loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

                this.authService.autoLogout(expirationDuration)
               return  authSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate), redirect: false});
                // this.autoLogout(expirationDuration);
            }
            return { type: 'DUMMY'};
        })
    ),)

     
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number ) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));

        return authSuccess({email: email,
                userId: userId,
                token: token,
                expirationDate: expirationDate,
                redirect: true});
    }   

    private handleError(errRespone) {
        let errorMessage = 'An unknown error occured!';
        if(!errRespone.error || !errRespone.error.error){
            return of(authFailed({error: errorMessage}), );
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

        return of(authFailed({error: errorMessage}), );
    }


    constructor(private actions$: Actions,
         private http: HttpClient,
         private router: Router,
         private authService: AuthService) {}
}
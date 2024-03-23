import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { logout } from "./store/auth.actions";

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
    private tokenExpirationTimer: any;    

    constructor(private store: Store<AppState>){}
    
    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(logout());
        },expirationDuration)
    }
    
    clearTokenExpirationTimer(){
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}
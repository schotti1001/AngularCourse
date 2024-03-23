import { Component,  OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {  Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import { auth, } from "./store/auth.selectors";
import { clearError, loginStart, signUpStart } from "./store/auth.actions";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoginMode= true;
    isLoading$ = false; 
    error$: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    private closeSub: Subscription;
    private storeSub: Subscription;


    constructor(private store: Store){}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }


    onSubmit(form: NgForm) {
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        if(this.isLoginMode) {
            this.store.dispatch(loginStart({email: email, password: password}));
        } else {
            this.store.dispatch(signUpStart({email: email, password: password}));
        }

        form.reset();
    }

    onHandleError() {
        this.store.dispatch(clearError());
    }

    private showErrorAlert(errorMessage: string){
       const hostViewContainerRef = this.alertHost.viewContainerRef;
       hostViewContainerRef.clear(); // entfernen von allen Elementen die dort gerendert sind

       const componentRef = hostViewContainerRef.createComponent(AlertComponent);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

    ngOnInit(): void {
       this.storeSub = this.store.select(auth).subscribe(authState => {
            this.error$ = authState.authError;
            this.isLoading$ = authState.loading;
            if(this.error$) {
                this.showErrorAlert(this.error$);
            }
        })
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}
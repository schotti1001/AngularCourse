import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode= true;
    isLoading = false; 
    error: string = null;
    authObs: Observable<AuthResponseData>;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    private closeSub: Subscription;


    constructor(private authService: AuthService,
         private router: Router,
         ){
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }


    onSubmit(form: NgForm) {
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading=true;
        this.error = null;
        if(this.isLoginMode) {
            this.authObs = this.authService.login(email, password);
        } else {
            this.authObs = this.authService.signUp(email, password);
        }

        this.authObs.subscribe(response => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage =>  {
            this.error = errorMessage;
            this.isLoading = false;
            this.showErrorAlert(errorMessage);
        });

        form.reset();
    }

    onHandleError() {
        this.error=null;
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

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}
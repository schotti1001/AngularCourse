import { Component,  OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { user } from '../auth/store/auth.selectors';
import { logout } from '../auth/store/auth.actions';
import { fetchRecipes, storeRecipes } from '../receipeBook/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
        private authSub : Subscription;
        isAuthenticated = false;

        constructor(
            private store: Store
            ){}

        ngOnInit(): void {
            this.authSub = this.store.select(user).subscribe(user => {
                this.isAuthenticated = !user ? false : true; //Kurschreibweise '!!user'
            });
        }

        ngOnDestroy(): void {
            this.authSub.unsubscribe();
        }

        saveData() {
            this.store.dispatch(storeRecipes());
        }

        onLogout(){
            this.store.dispatch(logout());
        }

        fetchData(){
            this.store.dispatch(fetchRecipes());
        }

}

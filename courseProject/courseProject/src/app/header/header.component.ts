import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { user } from '../auth/store/auth.selectors';
import { logout } from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
        private authSub : Subscription;
        isAuthenticated = false;

        constructor(private dataStorageService: DataStorageService, 
            private authService: AuthService,
            private store: Store
            ){
        }

        ngOnInit(): void {
            this.authSub = this.store.select(user).subscribe(user => {
                this.isAuthenticated = !user ? false : true; //Kurschreibweise '!!user'
            });
        }

        ngOnDestroy(): void {
            this.authSub.unsubscribe();
        }

        saveData() {
            this.dataStorageService.storeRecipes();
        }

        onLogout(){
            this.store.dispatch(logout());
        }

        fetchData(){
            this.dataStorageService.fetchData().subscribe();
        }

}

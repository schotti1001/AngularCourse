import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
        private authSub : Subscription;
        isAuthenticated = false;

        constructor(private dataStorageService: DataStorageService, private authService: AuthService){
        }

        ngOnInit(): void {
            this.authSub = this.authService.user.subscribe(user => {
                this.isAuthenticated = !user ? false : true; //Kurschreibweise '!!user'
            });
        }

        ngOnDestroy(): void {
            this.authSub.unsubscribe();
        }

        saveData() {
            this.dataStorageService.storeRecipes();
        }

        fetchData(){
            this.dataStorageService.fetchData().subscribe();
        }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

        constructor(private dataStorageService: DataStorageService){
        }

        saveData() {
            this.dataStorageService.storeRecipes();
        }

        fetchData(){
            this.dataStorageService.fetchData().subscribe();
        }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    username = 'Dummuser'

    checkEmpty(){
        return !this.username;
    }

    reset(){
        this.username = "";
    }
}

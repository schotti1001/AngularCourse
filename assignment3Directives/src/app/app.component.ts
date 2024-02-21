import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    showSecret = false;
    allClicks = [];

    toggleVisibility(){
        this.showSecret = !this.showSecret;
        var newEntry = this.allClicks.length+1;
        this.allClicks.push(new Date());
        console.log(newEntry)
    }

    after5(log){
        return log>5 ? true : false;
    }
}

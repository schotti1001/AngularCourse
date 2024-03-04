import { Component, OnInit } from '@angular/core';
import { USerService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    userActivated =false;

  constructor(private userService: USerService) {}

  ngOnInit() {
    this.userService.activedEmitter.subscribe((value: boolean) =>  {
        this.userActivated = true;
    })
  }
}

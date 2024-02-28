import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  inActiveUsers: string[];

  constructor(public userService: UserService) {
    this.inActiveUsers = userService.inactiveUsers;
  }
  
}

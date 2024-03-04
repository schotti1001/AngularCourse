import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { USerService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  private activatedSub: Subscription;

  constructor(private route: ActivatedRoute, private userService: USerService) {
  }
    ngOnDestroy(): void {
        this.activatedSub.unsubscribe();
    }

  ngOnInit() {
    this.activatedSub =  this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActived(){
    this.userService.activedEmitter.next(true);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { autoLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    constructor(private store :Store<AppState>) {}

  ngOnInit(): void {
      this.store.dispatch(autoLogin());
  }
}

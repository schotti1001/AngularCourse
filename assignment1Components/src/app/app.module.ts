import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SuccessAlert } from './successAlert/successAlert.component';
import { WarningAlert } from './warningAlert/warningAlert.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessAlert,
    WarningAlert
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

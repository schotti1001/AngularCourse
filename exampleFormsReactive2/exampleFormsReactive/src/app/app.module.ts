import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
    imports: [
    
        BrowserModule,
        ReactiveFormsModule
      ],
  declarations: [
    AppComponent,
  ],

  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

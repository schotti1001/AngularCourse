import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
testForm: FormGroup;

 ngOnInit(): void {
     this.testForm = new FormGroup({
        'projectName': new FormControl(null)
     })
 }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        'userData': new FormGroup({
            'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
            'email': new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails),
        }),
        'gender': new FormControl('male'),
        'hobbies': new FormArray([])
      });

    //   this.signupForm.valueChanges.subscribe((value) => console.log(value));
    this.signupForm.statusChanges.subscribe((value) => console.log(value));

    //Werte mit code setzten:
    //this.signupForm.patchValue()
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl):
     {[s: string]: boolean} //Syntax to define e.g. {'nameIsForbidden': true}
     {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
        return {'nameIsForbidden': true};
    }
    return null; //dont return  {'nameIsForbidden': false}!!!
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            if(control.value === 'test@test.com') {
                resolve({'emailIsForbidden': true})
            } else {
                resolve(null);
            }
        })
    });
    return promise;
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  
}

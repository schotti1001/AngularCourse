import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    exampleForm: FormGroup;

    ngOnInit(): void {
        this.exampleForm = new FormGroup({
            'projectName': new FormControl(null, [Validators.required, ], this.projectNameValidator),
            'mail': new FormControl(null, [Validators.required, Validators.email]),
            'status': new FormControl()
        })
    }

    onSubmit() {
        console.log(this.exampleForm);
        console.log(this.exampleForm.value.mail)
        console.log(this.exampleForm.value.projectName)
        console.log(this.exampleForm.value.status)
    }

    // projectNameValidator(control: FormControl):{[s: string]: boolean} {
    //     if(control.value === "Test"){
    //         return {'forbiddenName': true};
    //     } else {
    //         return null;
    //     }
    // }

    
    projectNameValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if(control.value === "Test"){
                    resolve({'forbiddenName': true});
                } else {
                    resolve(null);
                }
            }, 1000);
        });
        return promise;
       
    }
}

import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService{
    private turnedActive = 0;
    private turnedInactive = 0;

    switchToActiveOccured(){
        this.turnedActive++;
        console.log('Turned active: ' + this.turnedActive);
    }

    switchToInactiveOccured(){
        this.turnedInactive++;
        console.log('Turned inactive: ' + this.turnedInactive);
    }

    getSwitchesToActive(): number{
        return this.turnedActive;
    }

    getSwitchesInactive(): number{
        return this.turnedInactive;
    }
}

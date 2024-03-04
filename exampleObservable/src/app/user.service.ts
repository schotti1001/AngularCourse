import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class USerService{
    activedEmitter = new Subject<boolean>();
}
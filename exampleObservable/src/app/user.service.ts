import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class USerService{
    activedEmitter = new EventEmitter<boolean>();
}
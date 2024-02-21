import { Component, ContentChild, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})
export class ServerElementComponent {
    @Input('srvElement')
    element: {type: string, name:string, content:string};
    @ViewChild('heading', {static:true}) header: ElementRef;
    @ContentChild('contentParagraph', {static:true}) paragraph: ElementRef;

    constructor() {
        console.log("constructor");
    }

    ngOnInit() {
        console.log('ng')
    }
}

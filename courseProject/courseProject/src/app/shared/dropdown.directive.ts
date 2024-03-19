import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective  {
    @HostBinding('class.open') open: boolean=false;
    // @HostListener('click') clickedElement(eventData: Event) {
    //     this.open = !this.open;
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.open = this.elRef.nativeElement.contains(event.target) ? !this.open : false;
      }

      constructor(private elRef: ElementRef) {}
}
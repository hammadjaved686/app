import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyCustomDirective]' // Define your selector here
})
export class MyCustomDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow'; // Example: Manipulating the element
    this.el.nativeElement.style.width = '50%'; 
    this.el.nativeElement.style.height = '50%'; 

  }
}

import {Directive, ElementRef, OnChanges } from '@angular/core';



@Directive({
  selector: '[appDynamicColumn]'
})

export class AddcolumnDirective implements OnChanges {

  constructor(private el: ElementRef) {}
  private updateElem() {
    console.log(this.el.nativeElement);
  }
  ngOnChanges() {
    this.updateElem();
  }
}

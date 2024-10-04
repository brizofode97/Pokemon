import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  initialColor: string = '#f5f5f5';
  defaultColor: string = '#0096888';
  defaulttHeight: number = 220;

  constructor(private elementApplied: ElementRef) {
    this.setHeight(this.defaulttHeight);
    this.setBorder(this.initialColor);
  }

  @Input('pkmnBorderCard') borderColor: string; //avec alias
  // @Input() pkmnBorderCard: string; //sans alias  

  @HostListener('mouseenter') 
  onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  setHeight(height: number) {
    this.elementApplied.nativeElement.style.height = `${height}px`
  }

  setBorder(color: string) {
    this.elementApplied.nativeElement.style.border = 'solid 4px' + color;
  }

}

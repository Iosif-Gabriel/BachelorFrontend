import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollOnWheelDirective {

  constructor(private el: ElementRef) { }

  private lastY: number | undefined; 

  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent) {
    event.preventDefault(); 

    if (this.el.nativeElement) {
      const scrollDistance = this.el.nativeElement.scrollWidth / this.el.nativeElement.children.length;

      if (event.deltaY < 0) {
        // În sus
        this.el.nativeElement.scrollBy({
          left: -scrollDistance + 20,
          behavior: 'smooth'
        });
      } else {
        // În jos
        this.el.nativeElement.scrollBy({
          left: scrollDistance - 20,
          behavior: 'smooth'
        });
      }
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    event.preventDefault(); 

    if (this.el.nativeElement) {
      this.lastY = event.touches[0].clientY; 
    }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    event.preventDefault(); 

    if (this.el.nativeElement && this.lastY !== undefined) {
      const deltaY = event.touches[0].clientY - this.lastY; 
      this.lastY = event.touches[0].clientY; 

      const scrollDistance = this.el.nativeElement.scrollWidth / this.el.nativeElement.children.length;

      
      this.el.nativeElement.scrollLeft += deltaY;
    }
  }
}

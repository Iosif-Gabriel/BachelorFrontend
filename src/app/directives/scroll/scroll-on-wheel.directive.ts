import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollOnWheelDirective {

  constructor(private el: ElementRef) { }

  private lastY: number | undefined; // Definiți `lastY` ca fiind number sau undefined

  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent) {
    event.preventDefault(); // Opriți comportamentul implicit al evenimentului

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
    event.preventDefault(); // Opriți comportamentul implicit al evenimentului de atingere

    if (this.el.nativeElement) {
      this.lastY = event.touches[0].clientY; // Salvați ultima poziție Y a atingerii
    }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    event.preventDefault(); // Opriți comportamentul implicit al evenimentului de atingere

    if (this.el.nativeElement && this.lastY !== undefined) {
      const deltaY = event.touches[0].clientY - this.lastY; // Calculați distanța de deplasare în jos
      this.lastY = event.touches[0].clientY; // Actualizați ultima poziție Y a atingerii

      const scrollDistance = this.el.nativeElement.scrollWidth / this.el.nativeElement.children.length;

      // Derulați elementul în funcție de distanța de deplasare
      this.el.nativeElement.scrollLeft += deltaY;
    }
  }
}

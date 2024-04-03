import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  scrollNavbar(distance: number) {
    const navbar = this.elementRef.nativeElement.querySelector(".navbar");
    if (navbar) {
        const scrollLeft = navbar.scrollLeft + distance;
        navbar.scrollLeft = Math.min(Math.max(scrollLeft, 0), navbar.scrollWidth - navbar.clientWidth);
    }
}
}

import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const sliderElement = this.elementRef.nativeElement.querySelector('.slider');
    if (!sliderElement) {
      console.error('Slider element not found!');
      return;
    }

    setInterval(() => {
      this.slideToNext(sliderElement);
    }, 5000);
  }

  slideToNext(sliderElement: HTMLElement): void {
    const currentScrollPosition = sliderElement.scrollLeft;
    const slideWidth = sliderElement.offsetWidth;
    const totalScrollableWidth = sliderElement.scrollWidth;

   
    let nextScrollPosition = currentScrollPosition + slideWidth;

  
    if (nextScrollPosition + slideWidth >= totalScrollableWidth) {
       
        nextScrollPosition = 0;
    }

    
    sliderElement.scrollTo({
        left: nextScrollPosition,
        behavior: 'smooth'
    });
}

}

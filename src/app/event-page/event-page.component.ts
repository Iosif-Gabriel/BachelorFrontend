import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]

})
export class EventPageComponent {

  images: string[] = [
    '../assets/images/poze/drum.jpg',
    '../assets/images/poze/lililala.jpg',
    '../assets/images/poze/tanti.jpg',
    '../assets/images/poze/drum.jpg',
    '../assets/images/poze/lililala.jpg',
    '../assets/images/poze/tanti.jpg',
    '../assets/images/poze/drum.jpg',
    '../assets/images/poze/lililala.jpg',
    '../assets/images/poze/tanti.jpg',
    '../assets/images/poze/barca.jpg',

    // Adaugă mai multe imagini aici
  ];

  reviews: any[] = [
    { 
      author: 'John Doe',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Great Experience!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
    { 
      author: 'LALA',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Great Experience!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
    { 
      author: 'LILI',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Great Experience!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
    { 
      author: 'John Doe',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Foarte frumos frate',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
  ];

  prevSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: -scrollDistance + 20, // Adăugați un mic decalaj pentru a compensa animația
      behavior: 'smooth' // Folosiți scroll smooth
    });
  }
  
  nextSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: scrollDistance - 20, // Adăugați un mic decalaj pentru a compensa animația
      behavior: 'smooth' // Folosiți scroll smooth
    });
  }

}

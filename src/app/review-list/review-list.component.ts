import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FeedbackDTO } from '../dtos/FeedbackDTO';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {
  @ViewChild('reviewContainer') reviewContainer!: ElementRef;
   @Input() reviews!:FeedbackDTO[];

  // reviews: any[] = [
  //   { 
  //     userName: 'John Doe',
  //     date: 'June 1, 2000',
  //     rating: '5',
  //     subject: 'Great Experience!',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
  //   },
  //   { 
  //     userName: 'LALA',
  //     date: 'June 1, 2000',
  //     rating: '4',
  //     subject: 'Great Experience!',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
  //   },
  //   { 
  //     userName: 'LILI',
  //     date: 'June 1, 2000',
  //     rating: '2',
  //     subject: 'Great Experience!',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
  //   },
  //   { 
  //     userName: 'John Doe',
  //     date: 'June 1, 2000',
  //     rating: '3',
  //     subject: 'Foarte frumos frate',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
  //   },
  // ];


  prevSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: -scrollDistance + 1, // Adăugați un mic decalaj pentru a compensa animația
      behavior: 'smooth' // Folosiți scroll smooth
    });
  }
  
  nextSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: scrollDistance - 1, // Adăugați un mic decalaj pentru a compensa animația
      behavior: 'smooth' // Folosiți scroll smooth
    });
  }



}

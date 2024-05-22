import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FeedbackDTO } from '../dtos/FeedbackDTO';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit{

  @ViewChild('reviewContainer') reviewContainer!: ElementRef;
   @Input() reviews!:FeedbackDTO[];
   @Input() myRev:boolean=false;
   @Output() editReview = new EventEmitter<any>();

   onEditReview(review: any) {
    
     this.editReview.emit(review);
   }


   ngOnInit(): void {
   if(this.myRev==true){
    this.changesize();
   }
  }

  changesize() {
    const reviewList = document.getElementsByClassName("review-list")[0] as HTMLElement;
  
    if (reviewList) {
     reviewList.style.width='1000px'
      reviewList.style.height = '430px'; 
    }
  }
  

  prevSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: -scrollDistance + 1, 
      behavior: 'smooth'
    });
  }
  
  nextSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: scrollDistance - 1,
      behavior: 'smooth'
    });
  }



}

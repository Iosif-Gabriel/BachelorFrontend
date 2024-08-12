import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FeedbackDTO } from '../dtos/FeedbackDTO';
import { FeedbackService } from '../service/feedback/feedback.service';
import { ModalService } from '../service/modal/modal.service';
import { SectionService } from '../service/section/section.service';

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

   constructor(private viewContainerRef: ViewContainerRef,private modalService:ModalService,private feedbackService:FeedbackService,private sectionService:SectionService ){}

   onEditReview(review: any) {
    
     this.editReview.emit(review);
     this.feedbackService.setFeedback(review)
     this.sectionService.setActiveActivity("editReview");
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


  deleteFeedback(feedbackId:string){
    const index = this.reviews.findIndex(review => review.id === feedbackId);
    if (index !== -1) {
      this.reviews.splice(index, 1);
    }

    this.feedbackService.deleteUserFeedback(feedbackId).subscribe(
      resp => {
        console.log('Event deleted successfully:', resp);
        this.modalService.openModal(this.viewContainerRef, 'Deletion Successful', 'Success','Success');
        
      },
      error => {
        console.error('Failed to delete event:', error);
        this.modalService.openModal(this.viewContainerRef, 'Deletion Error', 'Error','Error');

      }
    );
    console.log(feedbackId);
  }
}

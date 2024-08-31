import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { retry } from 'rxjs';
import { FeedbackDTO } from '../../../dtos/FeedbackDTO';
import { FeedbackService } from '../../../service/feedback/feedback.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{


  @Input() myRev!:boolean;
  @Input() review!: FeedbackDTO;
  reviewB:boolean=false;
  @Output() editReview = new EventEmitter<FeedbackDTO>();
  @Output() deleteFeedbackEmitter=new EventEmitter<string>();

  constructor() {}

  onEditClick() {
   this.editReview.emit(this.review);
    
  }

  ngOnInit(): void {
  //  console.log(this.myRev);
  }

  getNumericRating(): number {
    return parseInt(this.review.rating);
  }

  deleteReview(reviewId:any){
    this.deleteFeedbackEmitter.emit(reviewId);
  
  }

  editReviews(review:any){
    
    this.reviewB=true;
  }
}

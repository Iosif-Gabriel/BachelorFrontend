import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { retry } from 'rxjs';
import { FeedbackDTO } from '../dtos/FeedbackDTO';

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

  onEditClick() {
   
    this.editReview.emit(this.review);
  }

  ngOnInit(): void {
   console.log(this.myRev);
  }

  getNumericRating(): number {
    return parseInt(this.review.rating);
  }

  deleteReview(review:any){
    console.log("deletREv"+review.id);
  
  }

  editReviews(review:any){
  
    this.reviewB=true;
  }
}

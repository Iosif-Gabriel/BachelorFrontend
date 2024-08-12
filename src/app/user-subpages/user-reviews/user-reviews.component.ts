import { Component, OnInit } from '@angular/core';
import { FeedbackDTO } from 'src/app/dtos/FeedbackDTO';
import { FeedbackService } from 'src/app/service/feedback/feedback.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {

  myFeedback:FeedbackDTO[]=[];
  reviewB:boolean=false;
  selectedReview?: FeedbackDTO|null;
  constructor(private tokenService:TokenService,private popupService:PopupService,private feedbackService:FeedbackService){
    this.popupService.closeCreateReview.subscribe(()=>{
      this.closeReview();
    })
  }

  ngOnInit(): void {
    
    const userId=this.tokenService.getUser().id;

    this.feedbackService.getUserFeedback(userId).subscribe((userFeedback)=>{
      this.myFeedback=userFeedback;
      this.popupService.setisEventPageOpen(true);
      console.log(this.myFeedback);
    })
  }

  editReview(review: FeedbackDTO): void {
   
    this.selectedReview = review;
    this.reviewB = true;
    
  }

  closeReview(): void {
    this.reviewB = false;
    this.selectedReview = null;
  }

  

}

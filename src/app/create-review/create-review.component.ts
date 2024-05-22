import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupService } from '../service/popup/popup.service';

import { TokenService } from '../service/token/token.service';
import { format } from 'date-fns';

import { FeedbackService } from '../service/feedback/feedback.service';
import { FeedbackDTO } from '../dtos/FeedbackDTO';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent {
  
  @Input() eventData!: { eventid: string, eventName: string };
  parentRating: number = 0;
  @Output() closeEdit = new EventEmitter<any>();

  reviewDTO:FeedbackDTO={
      id:'',
      userId: '',
      date: '',
      rating: '',
      subject: '',
      description:'',
      eventId:'',
      userName:'',
      eventName:''
  }
  constructor(private feedbackService:FeedbackService,private tokenService:TokenService,private popupService:PopupService){}


  
  closePopup(){
    this.popupService.closeCreateReview.emit();
    this.closeEdit.emit(true);
  }

  submitReview(){
   
    const user =this.tokenService.getUser();
    const feedback:FeedbackDTO={
      id:'',
      userId: user.id,
      date: format(new Date(), 'yyyy-MM-dd'),
      rating: this.parentRating?.toString(),
      subject: this.reviewDTO.subject,
      description: this.reviewDTO.description,
      eventId:this.eventData.eventid,
      userName:'',
      eventName:''
    }
    console.log(feedback)
   this.feedbackService.createFeedback(feedback).subscribe(res=>{
    console.log(res);
   })
  }

  onRatingChange(rating: number) {
    this.parentRating = rating;
  }
  
}

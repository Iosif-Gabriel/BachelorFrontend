import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { PopupService } from '../service/popup/popup.service';

import { TokenService } from '../service/token/token.service';
import { format } from 'date-fns';

import { FeedbackService } from '../service/feedback/feedback.service';
import { FeedbackDTO } from '../dtos/FeedbackDTO';
import { ModalService } from '../service/modal/modal.service';
import { SectionService } from '../service/section/section.service';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit{
  
  @Input() eventData!: { eventid: string, eventName: string };
  parentRating: number = 0;
  @Output() closeEdit = new EventEmitter<any>();
  editfeedback!:FeedbackDTO;
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
  constructor(private sectionService:SectionService,private feedbackService:FeedbackService,private tokenService:TokenService,private popupService:PopupService,private modalService:ModalService,private viewContainerRef: ViewContainerRef){}
  
  
  ngOnInit(): void {
    if(this.sectionService.getActiveActivity()==="editReview"){
       this.editfeedback=this.feedbackService.getFeedback()
    
      if(this.editfeedback.id){
        this.reviewDTO.description=this.editfeedback.description;
        this.parentRating=Number(this.editfeedback.rating);
        this.reviewDTO.subject=this.editfeedback.subject;
      }
    }
   
  
  }

  
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
    if(this.sectionService.getActiveActivity()==="editReview"){
      feedback.id=this.editfeedback.id;
      
      this.feedbackService.patchFeedback(feedback).subscribe(res=>{
       
        if(res){
        
          this.modalService.openModal('createEvent succ',this.viewContainerRef, 'Thank you for your Feedback!', 'Review patched succesfully','Success');
         
        }else{
          this.modalService.openModal('createEvent err',this.viewContainerRef, 'Thank you for your time!', 'Error, try again later!','Error');
          
        }
      })
    }else{


   this.feedbackService.createFeedback(feedback).subscribe(res=>{
      if(res){
        
        this.modalService.openModal('createEvent succ2',this.viewContainerRef, 'Thank you for your Feedback!', 'Review added succesfully','Success');
       
      }else{
        this.modalService.openModal('createEvent err2',this.viewContainerRef, 'Thank you for your time!', 'Error, try again later!','Error');
        
      }
      
   })
  }
   
   
  }

  onRatingChange(rating: number) {
    this.parentRating = rating;
  }
  
}

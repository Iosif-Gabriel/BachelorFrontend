import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { PopupService } from '../../../service/popup/popup.service';

import { TokenService } from '../../../service/token/token.service';
import { format } from 'date-fns';

import { FeedbackService } from '../../../service/feedback/feedback.service';
import { FeedbackDTO } from '../../../dtos/FeedbackDTO';
import { ModalService } from '../../../service/modal/modal.service';
import { SectionService } from '../../../service/section/section.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  showRatingError: boolean = false;
  reviewForm!:FormGroup;
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
  constructor(private fb:FormBuilder,private sectionService:SectionService,private feedbackService:FeedbackService,private tokenService:TokenService,private popupService:PopupService,private modalService:ModalService,private viewContainerRef: ViewContainerRef){}
  
  
  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [0, Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
    if(this.sectionService.getActiveActivity()==="editReview"){
       this.editfeedback=this.feedbackService.getFeedback()
      console.log(this.editfeedback);
      if(this.editfeedback.id){
        this.reviewForm.get("description")?.setValue(this.editfeedback.description);
        this.reviewForm.get("subject")?.setValue(this.editfeedback.subject);
        this.reviewForm.get("rating")?.setValue(Number(this.editfeedback.rating));
     
      }
    }

    this.parentRating=this.reviewForm.get('rating')?.value
    this.reviewForm.get('rating')?.valueChanges.subscribe(value => {
      if (value > 0) {
        this.showRatingError = false;
      }
    });
  //  console.log(this.eventData);
  
  }

  
  closePopup(){
    this.popupService.closeCreateReview.emit();
    this.closeEdit.emit(true);
  }

  submitReview(){

    if(this.reviewForm.invalid){
      this.modalService.openModal('createRew succ',this.viewContainerRef, 'Feedback error!', 'Complete all fields!','Error');
      return;
    }

    if (this.reviewForm.get('rating')?.value === 0) {
      this.showRatingError = true;
      return;
    }
    const user =this.tokenService.getUser();

    const feedback:FeedbackDTO={
      id:'',
      userId: user.id,
      date: format(new Date(), 'yyyy-MM-dd'),
      rating: this.reviewForm.get("rating")?.value,
      subject: this.reviewForm.get('subject')?.value,
      description: this.reviewForm.get('description')?.value,
      eventId:this.eventData.eventid,
      userName:'',
      eventName:''
    }
    console.log(feedback);
    if(this.sectionService.getActiveActivity()==="editReview"){
      feedback.id=this.editfeedback.id;
      
      this.feedbackService.patchFeedback(feedback).subscribe(res=>{
       
        if(res){
        
          this.modalService.openModal('createRew succ',this.viewContainerRef, 'Thank you for your Feedback!', 'Review patched succesfully','Success');
         
        }else{
          this.modalService.openModal('createRew err',this.viewContainerRef, 'Thank you for your time!', 'Error, try again later!','Error');
          
        }
      })
    }else{
   this.feedbackService.createFeedback(feedback).subscribe(res=>{
      if(res){
        
        this.modalService.openModal('createRew succ2',this.viewContainerRef, 'Thank you for your Feedback!', 'Review added succesfully','Success');
       
      }else{
        this.modalService.openModal('createRew err2',this.viewContainerRef, 'Thank you for your time!', 'Error, try again later!','Error');
        
      }
      
   })
  }
   
   
  }

  onRatingChange(rating: number) {
    this.parentRating = rating;
  }
  
}

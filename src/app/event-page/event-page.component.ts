import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { ImageService } from '../service/image/image.service';
import { PopupService } from '../service/popup/popup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackDTO } from '../dtos/FeedbackDTO';
import { FeedbackService } from '../service/feedback/feedback.service';
import { NextRouteService } from '../service/next-route/next-route.service';
import { TokenService } from '../service/token/token.service';

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
export class EventPageComponent implements OnInit,OnDestroy{

  event!: EventWithPicturesDTO;
  pictureUrl!:{ [key: string]: string };
  purchaseForm!: FormGroup;
  feedbacks: FeedbackDTO[] = [];
  myEvent:boolean=false;
  



  constructor(private tokenService:TokenService,
    private feedbackService:FeedbackService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,private imageService:ImageService,private popUpService:PopupService) {
 
      
    }

  ngOnDestroy(): void {
    // const nextRoute = this.nextRouteService.getNextRoute();
    // console.log(nextRoute);
    // if(nextRoute==='/userCreatedEvents'){
    //   this.popUpService.setisEventPageOpen(true);
    // }else{
    //   this.popUpService.setisEventPageOpen(false);
    // }
 
  }

  ngOnInit(): void {

    this.purchaseForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const eventId = params['id'];

      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event;
        this.popUpService.setisEventPageOpen(true);
        this.pictureUrl = event.pictureUrls;
        this.imageService.setImageListPath(this.pictureUrl);
        const userId=this.tokenService.getUser().id;

        if(this.event.idUser===userId){
          this.myEvent=true;
          console.log(this.myEvent+"myevent")
        }

       
        this.purchaseForm.patchValue({
          startDate: this.event.startTime,
          endDate: this.event.endTime
        });
      });

      this.feedbackService.getEventFeedback(eventId).subscribe(feedback=>{
        this.feedbacks=feedback;
      })
    });

   
  }


 
  
 

}

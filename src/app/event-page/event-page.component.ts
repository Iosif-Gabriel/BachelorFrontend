import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { formatDate } from 'date-fns';
import { SectionService } from '../service/section/section.service';
import { FavService } from '../service/favourite/fav.service';

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
  available:boolean=false;
  @ViewChild('favButtonEvent') favButton!: ElementRef;
  

  constructor(private tokenService:TokenService,
    private favService:FavService,
    private feedbackService:FeedbackService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,private imageService:ImageService,private popUpService:PopupService) {
 
      
    this.purchaseForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

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

 

  addToFavorites(event: any) {
 
    this.favService.addToFavorites(event,"svgheartEvent");
    const userId=this.tokenService.getUser().id;
    this.toogleFav(event.id,userId);
    
  }

  toogleFav(eventid:string,userId:string){
    this.eventService.addEventToFav(eventid,userId).subscribe((response)=>{
      this.event.fav=!this.event.fav
    })
  }

  ngOnInit(): void {
    this.loadEvent();
  }

    
  private loadEvent() {
    this.route.params.subscribe(params => {
      const eventId = params['id'];
      const userId = this.tokenService.getUser().id;
      this.fetchEvent(eventId, userId);
      this.getFeedback(eventId);

    });
  }

  private fetchEvent(eventId: any, userId: any) {
    this.eventService.getEventById(eventId).subscribe(currentEvent => {
      this.event = currentEvent;
      this.popUpService.setisEventPageOpen(true);
      this.pictureUrl = currentEvent.pictureUrls;
      this.imageService.setImageListPath(this.pictureUrl);
      this.checkEventFav(eventId, userId);
      this.checkMyEvent(userId);
      this.initPurchase();

    });
  }

  private checkMyEvent(userId: any) {
    if (this.event.idUser === userId) {
      this.myEvent = true;

    }
  }

  private checkEventFav(eventId: any, userId: any) {
    this.eventService.checkFavEvent(eventId, userId).subscribe((response) => {
      console.log(response);
      this.event.fav = response;
      if (this.favButton) {

        if (response === true) {
          this.favButton.nativeElement.classList.remove("svgheartEvent");
        } else if (response === false) {
          this.favButton.nativeElement.classList.add("svgheartEvent");
        }
      }
    });
  }

  private initPurchase() {
    this.purchaseForm.patchValue({
      startDate: this.event.startTime,
      endDate: this.event.endTime
    });
  }

  private getFeedback(eventId: any) {
    this.feedbackService.getEventFeedback(eventId).subscribe(feedback => {
      this.feedbacks = feedback;
    });
  }

formatDateEvent(date: string) {
  return formatDate(date,'dd/MM/yyyy');
  }
  


 
  
 

}

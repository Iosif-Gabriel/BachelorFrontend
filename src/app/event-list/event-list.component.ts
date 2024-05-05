import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventDTO } from '../dtos/EventDTO';
import { EventService } from '../service/event/event.service';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup/popup.service';
import { TokenService } from '../service/token/token.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {

   events: EventDTO[] = [];
   eventsWithPictures: EventWithPicturesDTO[] = [];
   orgEvetnsOn:boolean=false;

  constructor(private tokenService:TokenService,private popUp:PopupService,private eventService:EventService,private router: Router){}

  ngOnInit(): void {
   this.eventService.getCoverPhotos().subscribe(response=>{
    this.eventsWithPictures = response;
  
   })
   this.popUp.isUserOrgEventsOpen.subscribe(org=>{
   console.log(org);
    if(org){
      const user=this.tokenService.getUser();
      console.log(user);

      this.eventService.getOrganizerEvents(user.id).subscribe(list=>{
        this.eventsWithPictures=list;
        console.log(this.eventsWithPictures);
      })
     }
   })

  
  }




}

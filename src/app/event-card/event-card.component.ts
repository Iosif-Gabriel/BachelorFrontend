import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EventDTO } from '../dtos/EventDTO';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { PopupService } from '../service/popup/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventCardComponent implements OnInit {

  @Input() event: EventWithPicturesDTO | undefined;
  favEvents: string[] = [];
  fav:boolean=false;
  isOrgEventOpen:boolean=false;

  constructor(private router:Router,private popupService:PopupService){}

  ngOnInit(): void {
    this.popupService.isUserOrgEventsOpen.subscribe(org=>{
      this.isOrgEventOpen=org;
      
    })
  
  }

  addToFav(eventId: string) {
    console.log("Event ID:", eventId);
    console.log("Before adding to fav:", this.favEvents);
    
    if (this.isFav(eventId)) {
      this.favEvents = this.favEvents.filter(id => id !== eventId);
    } else {
      this.favEvents.push(eventId);
    }
  
    console.log("After adding to fav:", this.favEvents);
  }

 
 isFav(eventId: string): boolean {
  
  return this.favEvents.includes(eventId);
}


  openEventPage(eventId:string){
    this.popupService.isUserOrgEventsOpen.subscribe(org=>{
      if(org==false){
        this.router.navigate(['/event', eventId]);
      }
    })
    
  }





  getCoverImageUrl(): string {
    if (this.event && this.event.pictureUrls) {
      const keys = Object.keys(this.event.pictureUrls);
      for (const key of keys) {
        const url = this.event.pictureUrls[key];
        if (url) {
          
          const relativePath = url.replace("E:\\Facultate\\Anul4\\Licenta\\Front\\eventMaker\\src\\", "").replace(/\\/g, '/');
        //  console.log(relativePath);
          return relativePath;
        }
      }
    }
    
    return 'assets/images/poze/barca.jpg'
  }
  
  deleteEvent(eventId:string){
    console.log(eventId);
  }
  
  
  
}

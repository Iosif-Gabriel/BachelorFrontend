import { Component, Input, OnInit } from '@angular/core';
import { EventCardComponent } from '../event-card/event-card.component';
import { forkJoin, of, switchMap } from 'rxjs';
import { EventService } from '../service/event/event.service';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup/popup.service';
import { TokenService } from '../service/token/token.service';
import { SectionService } from '../service/section/section.service';
import { SearchService } from '../service/seach/seach.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {

  @Input() userEvents:EventWithPicturesDTO[]=[];
   eventsWithPictures: EventWithPicturesDTO[] = [];
   searchResult:EventWithPicturesDTO[]=[];
   favEvents:EventWithPicturesDTO[]=[];
   orgEvetnsOn:boolean=false;
   searchTerm: string = '';
   filterTerm:string ='';
   noEventsFound: boolean = false;
  

  constructor(private searchService: SearchService,private sectionService:SectionService,private tokenService:TokenService,private popUp:PopupService,private eventService:EventService,private router: Router){}

  ngOnInit(): void {
    const user = this.tokenService.getUser();
   
    if (this.sectionService.getActiveSection() === 'userOrgEvents') {
      
        this.searchResult = this.userEvents;
        this.sectionService.setMyEvents(this.searchResult);
 
    }else if(this.sectionService.getActiveSection() === 'userFavEvents'){
      
        this.searchResult=this.userEvents;
        this.sectionService.setFavEvents(this.searchResult);
      
  
    }else{
      this.searchService.searchTerm$.subscribe(searchTerm => {
        this.searchTerm = searchTerm;
     
        this.searchEvents();
      });
    }
    
    this.filterEvents()

  }

  filterEvents(): void {
    this.searchService.filterItem$.subscribe(filterTerm => {
     
      if (filterTerm) {
        console.log(filterTerm);
        this.eventService.getEventsByEventType(filterTerm).pipe(
          switchMap(res => {
            if (res.length === 0 && filterTerm !== "All") {
              this.sectionService.setEventsFound(true);
            } else {
              this.sectionService.setEventsFound(false);
            }
  
            if (filterTerm === "All") {
              console.log(this.eventsWithPictures)
              return of(this.eventsWithPictures);
            } else {
              
              return this.tokenService.getUser() ? this.updateFavStatus(res, this.tokenService.getUser().id) : of(res);
            }
          })
        ).subscribe(updatedEvents => {
          this.searchResult = updatedEvents;
       
        });
      }
    });
  }
  
searchEvents(): void {
  if (this.searchTerm.trim() !== '') {
    let filteredEvents =this.getEvents();
    
    filteredEvents = filteredEvents.filter(event => {
      const eventNameLC = event.eventName.toLowerCase();
      const descriptionLC = event.description.toLowerCase();
      const searchTermLC = this.searchTerm.toLowerCase();
      return eventNameLC.includes(searchTermLC) || descriptionLC.includes(searchTermLC);
    });
    
    this.noEventsFound = filteredEvents.length === 0;
    this.sectionService.setEventsFound(this.noEventsFound);

    this.searchResult = filteredEvents;
   
  } else {
    this.noEventsFound = false; 
    this.sectionService.setEventsFound(this.noEventsFound);
    this.loadEvents();
  
  }
}
getEvents():EventWithPicturesDTO[]{

  return this.searchResult;
}



loadEvents() {
  this.eventService.getCoverPhotos().subscribe(res => {

    const userId = this.tokenService.getUser()?.id;

    this.updateFavStatus(res, userId).then(updatedEvents => {
     
      this.eventsWithPictures = updatedEvents;
      this.searchResult=updatedEvents;
      this.sectionService.setEvents(this.eventsWithPictures);
    
    }).catch(error => {
      console.error('Eroare la actualizarea stării favoritelor:', error);
  
    });
  });
}

updateFavStatus(eventsList: any[], userId: string): Promise<any[]> {
  return this.eventService.getUserFavEvents(userId).toPromise()
    .then(favEvents => {
      eventsList.forEach(event => {

        const isFav = favEvents?.some(favEvent => favEvent.id === event.id);

        event.fav = isFav;
      });

      
      return eventsList;
    })
    .catch(error => {
      console.error('Eroare la obținerea evenimentelor favorite:', error);
      return eventsList; 
    });
}


  
 
  addToFavorites(eventId: string) {
    console.log(eventId);
    const eventToUpdate = this.searchResult.find(event => event.id === eventId);
    console.log(eventToUpdate);
    if (eventToUpdate) {
    
      eventToUpdate.fav = !eventToUpdate.fav;
      const user=this.tokenService.getUser();
         this.eventService.addEventToFav(eventId,user.id).subscribe(fav=>{
     
    })
    }
    
  }



}

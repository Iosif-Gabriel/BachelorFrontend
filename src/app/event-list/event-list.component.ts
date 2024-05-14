import { Component, OnInit } from '@angular/core';
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
  
      this.eventService.getOrganizerEvents(user.id).subscribe(list => {
        this.searchResult = list;
        console.log(this.eventsWithPictures);
        this.sectionService.setMyEvents(list);
      });
    }else if(this.sectionService.getActiveSection() === 'userFavEvents'){
      this.eventService.getUserFavEvents(user.id).subscribe(favEvents=>{
        console.log(favEvents);
        this.searchResult=favEvents;
        this.sectionService.setFavEvents(favEvents);
      })
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
        this.eventService.getEventsByEventType(filterTerm).pipe(
          switchMap(res => {
            if (res.length === 0 && filterTerm !== "All") {
              this.sectionService.setEventsFound(true);
            } else {
              this.sectionService.setEventsFound(false);
            }
  
            if (filterTerm === "All") {
              return of(this.getEvents());
            } else {
              
              return this.tokenService.getUser() ? this.updateFavStatus(res, this.tokenService.getUser().id) : of(res);
            }
          })
        ).subscribe(updatedEvents => {
          this.eventsWithPictures = updatedEvents;
       
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

    this.eventsWithPictures = filteredEvents;
  } else {
    this.noEventsFound = false; 
    this.sectionService.setEventsFound(this.noEventsFound);
    this.loadEvents();
  
  }
}
getEvents():EventWithPicturesDTO[]{

  return this.searchResult;
}

  
// loadAllEvents() {
//   const user = this.tokenService.getUser();
//   forkJoin([
//     this.eventService.getCoverPhotos(),
//     this.eventService.getUserFavEvents(user.id)
//   ]).subscribe(([eventsResponse, favEvents]) => {

//     this.eventsWithPictures = eventsResponse.map(event => {
//       const isFav = favEvents.some(favEvent => favEvent.id === event.id);
//       return { ...event, fav: isFav };
//     });

//     this.searchResult = this.eventsWithPictures;

//     this.sectionService.setEvents(this.eventsWithPictures);
//   });
// }

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

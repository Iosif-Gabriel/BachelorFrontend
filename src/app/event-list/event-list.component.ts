import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { EventService } from '../service/event/event.service';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup/popup.service';
import { TokenService } from '../service/token/token.service';
import { SectionService } from '../service/section/section.service';
import { SearchService } from '../service/seach/seach.service';
import { ModalService } from '../service/modal/modal.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {

  //@Input() userEvents:EventWithPicturesDTO[]=[];
   eventsWithPictures: EventWithPicturesDTO[] = [];
   searchResult:EventWithPicturesDTO[]=[];
   favEvents:EventWithPicturesDTO[]=[];
   orgEvetnsOn:boolean=false;
   searchTerm: string = '';
   filterTerm:string ='';
   noEventsFound: boolean = false;
  

  constructor(private viewContainerRef: ViewContainerRef,private modalService:ModalService,private searchService: SearchService,private sectionService:SectionService,private tokenService:TokenService,private popUp:PopupService,private eventService:EventService,private router: Router){}

  ngOnInit(): void {
 
    if (this.sectionService.getActiveSection() === 'userOrgEvents') {
      
      this.fetchOrgEvents().subscribe(
        (events)=>{
          this.loadEvents(events);
        }
      );
 
    }else if(this.sectionService.getActiveSection() === 'userFavEvents'){
      
      this.fetchFavEvents().subscribe(
        (events)=>{
          this.loadEvents(events);
        }
      );
      
    }else if(this.sectionService.getActiveSection()==='allEvents'){
      
      this.fetchEvents().subscribe(
        (events)=>{
          this.loadEvents(events);
        }
      );


      this.filterEvents()

      
      this.searchService.searchTerm$.subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.searchEvents();
      
      });
     
    
   
    }   
    
   
     
    

  }

  filterEvents(): void {
    this.searchService.filterItem$.pipe(
      switchMap(filterTerm => {
        if (!filterTerm) {
          return of([]);
        }

        if (filterTerm === 'All') {
          return this.fetchEvents().pipe(
            switchMap(events => {
              this.eventsWithPictures = events;
              this.sectionService.setEventsFound(false);
              return of(this.eventsWithPictures);
            }),
            catchError(error => {
              console.error('Error fetching events:', error);
              this.sectionService.setEventsFound(true);
              return of([]);
            })
          );
        } else {
          return this.eventService.getEventsByEventType(filterTerm).pipe(
            switchMap(events => {
              if (events.length === 0) {
                this.sectionService.setEventsFound(true);
              } else {
                this.sectionService.setEventsFound(false);
              }

              const userId = this.tokenService.getUser()?.id;
              if (userId) {
                return this.updateFavStatus(events, userId);
              } else {
                return of(events);
              }
            }),
            catchError(error => {
              console.error('Error filtering events:', error);
              this.sectionService.setEventsFound(true);
              return of([]);
            })
          );
        }
      })
    ).subscribe(updatedEvents => {
      this.eventsWithPictures = updatedEvents;
      this.loadEvents(this.eventsWithPictures);
    });
  }
  
  searchEvents(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (term) {
      this.fetchEvents().pipe(
        switchMap(events => {
          const filteredEvents = events.filter(event => {
            const eventNameLC = event.eventName.toLowerCase();
            const descriptionLC = event.description.toLowerCase();
            const eventLocation = event.idLocation.toLowerCase();
            return eventNameLC.includes(term) || descriptionLC.includes(term) || eventLocation.includes(term);
          });

          this.noEventsFound = filteredEvents.length === 0;
          this.sectionService.setEventsFound(this.noEventsFound);
        
          this.loadEvents(filteredEvents)
          return of(filteredEvents);
        }),
        catchError(error => {
          console.error('Error filtering events:', error);
          this.noEventsFound = true;
          this.sectionService.setEventsFound(true);
          return of([]);
        })
      ).subscribe();
    } else {
     
      this.noEventsFound = false;
      this.sectionService.setEventsFound(false);
      
      this.fetchEvents().subscribe(events => {
        this.loadEvents(events)
      }, error => {
        console.error('Error fetching all events:', error);
        this.noEventsFound = true;
        this.sectionService.setEventsFound(true);
      });
    }
  }

loadEvents(events:EventWithPicturesDTO[]){
  this.eventsWithPictures=events;

}

fetchEvents(): Observable<EventWithPicturesDTO[]> {
  return this.eventService.getCoverPhotos().pipe(
    switchMap(res => {
      const userId = this.tokenService.getUser()?.id;
      return this.updateFavStatus(res, userId).pipe(
        switchMap(updatedEvents => {
          this.sectionService.setEvents(updatedEvents);
          return of(updatedEvents);
        }),
        catchError(error => {
          console.error('Error updating favorite status:', error);
          return of([]);
        })
      );
    }),
    catchError(error => {
      console.error('Error fetching cover photos:', error);
      return of([]); 
    })
  );
}

private updateFavStatus(events: EventWithPicturesDTO[], userId: string): Observable<EventWithPicturesDTO[]> {
  return this.eventService.getUserFavEvents(userId).pipe(
    switchMap(favEvents => {
      events.forEach(event => {
        const isFav = favEvents.some(favEvent => favEvent.id === event.id);
        event.fav = isFav;
      });
      return of(events);
    }),
    catchError(error => {
      console.error('Error fetching favorite events:', error);
      return of(events);
    })
  );
}

fetchFavEvents(): Observable<EventWithPicturesDTO[]> {
  const userId = this.tokenService.getUser()?.id;

  if (!userId) {
   
    console.warn('User ID not found. Returning empty list of favorite events.');
    return of([]);
  }

  return this.eventService.getUserFavEvents(userId).pipe(
    catchError(error => {
      console.error('Error fetching favorite events:', error);
      
      return of([]);
    })
  );
}

fetchOrgEvents(): Observable<EventWithPicturesDTO[]> {
  const userId = this.tokenService.getUser()?.id;

  if (!userId) {
   
    console.warn('User ID not found. Returning empty list of favorite events.');
    return of([]);
  }

  return this.eventService.getOrganizerEvents(userId).pipe(
    catchError(error => {
      console.error('Error fetching favorite events:', error);
      
      return of([]);
    })
  );
}


  addToFavorites(eventId: string) {
    console.log(eventId);
    const eventToUpdate = this.eventsWithPictures.find(event => event.id === eventId);
    console.log(eventToUpdate);
    if (eventToUpdate) {
    
      eventToUpdate.fav = !eventToUpdate.fav;
      const user=this.tokenService.getUser();
         this.eventService.addEventToFav(eventId,user.id).subscribe()
    }
    
  }

  deleteEvent(eventId:string){
    const index = this.searchResult.findIndex(event => event.id === eventId);
    if (index !== -1) {
      this.searchResult.splice(index, 1);
    }

    this.eventService.deleteEvent(eventId).subscribe(
      resp => {
        console.log('Event deleted successfully:', resp);
        this.modalService.openModal(this.viewContainerRef, 'Deletion Successful', 'Succes','Succes');
        
      },
      error => {
        console.error('Failed to delete event:', error);
        this.modalService.openModal(this.viewContainerRef, 'Deletion Error', 'Error','Error');

      }
    );
    console.log(eventId);
    
  }



}

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { EventDTO } from '../dtos/EventDTO';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { PopupService } from '../service/popup/popup.service';
import { Router } from '@angular/router';
import { SectionService } from '../service/section/section.service';
import { TokenService } from '../service/token/token.service';
import { EventService } from '../service/event/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventCardComponent implements OnInit,AfterViewInit {

  @Input() event: EventWithPicturesDTO | undefined;
  @Input() cardId:string | undefined;
  @Output() addToFavoritesEvent = new EventEmitter<string>();
  @ViewChild('favButton') favButton!: ElementRef;
  isFavorite: boolean = false;
  isOrgEventOpen:boolean=false;

  constructor(private eventService:EventService,private section:SectionService,private router:Router,private popUpService:PopupService){}
  ngAfterViewInit(): void {
    this.isfavouritee(this.event)
  }

  ngOnInit(): void {
    if(this.section.getActiveSection()!='allEvents' && this.section.getActiveSection()!='userFavEvents'){
      this.isOrgEventOpen=true;
    }
  
  }

  isfavouritee(event: any) {

    if (this.favButton) {
     
      if (event.fav === true) {
        this.favButton.nativeElement.classList.remove("svgheart");
      } else if (event.fav === false) {
        this.favButton.nativeElement.classList.add("svgheart");
      }
    }
  }

  
  addToFavorites(event: any) {
    const buttonId = 'fav_' + event.id;
    const favButton = document.getElementById(buttonId);
   
    if (favButton) {
      if (event.fav === false) {
        favButton.classList.remove("svgheart");
      } else if(event.fav===true) {
        favButton.classList.add("svgheart");
      }
    }
    this.addToFavoritesEvent.emit(event.id);
  }
  

  openEventPage(eventId:string){
    if(this.section.getActiveSection()=='allEvents'){
        this.router.navigate(['/event', eventId]);
      }
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

  editEvent(event:any){
    this.section.setActiveActivity("editEvent");
    this.eventService.setEventWithPictures(event);
    this.popUpService.setCreatEventOpen(true);
  }

  getShortDescription(): string {
    if (this.event?.description && this.event.description.length > 50) {
      return this.event.description.substring(0, 55) + '...';
    }
    return this.event?.description || '';
  }
  
  
  
}

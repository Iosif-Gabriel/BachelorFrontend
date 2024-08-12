import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { EventDTO } from '../dtos/EventDTO';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { PopupService } from '../service/popup/popup.service';
import { Router } from '@angular/router';
import { SectionService } from '../service/section/section.service';
import { TokenService } from '../service/token/token.service';
import { EventService } from '../service/event/event.service';
import { ModalService } from '../service/modal/modal.service';
import { ImageService } from '../service/image/image.service';
import { FavService } from '../service/favourite/fav.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventCardComponent implements OnInit,AfterViewInit {

  @Input() event: EventWithPicturesDTO | undefined;
  @Input() cardId:string | undefined;
  @Output() deleteEventEmitter=new EventEmitter<string>();
  @Output() addToFavoritesEvent = new EventEmitter<string>();
  @ViewChild('favButton') favButton!: ElementRef;

  isOrgEventOpen:boolean=false;

  constructor(private favService:FavService,private imageService:ImageService,private eventService:EventService,private section:SectionService,private router:Router,private popUpService:PopupService){}
  

  ngOnInit(): void {
    if(this.section.getActiveSection()!='allEvents' && this.section.getActiveSection()!='userFavEvents'){
      this.isOrgEventOpen=true;
    }
  
  }

  ngAfterViewInit(): void {
    this.favService.setFavButton(this.favButton);
    this.isfavouritee(this.event)
  }

  isfavouritee(event: any) {
    this.favService.isfavouritee(event,"svgheart");
  }

  
  addToFavorites(event: any) {
    this.favService.addToFavorites(event,"svgheart");
    this.addToFavoritesEvent.emit(event.id);
  }
  

  openEventPage(eventId:string){
    if(this.section.getActiveSection()=='allEvents' || this.section.getActiveSection()==='userFavEvents'){
        this.router.navigate(['/event', eventId]);
        this.section.setActiveActivity(String(this.event?.fav));
      }
  }

  getCoverImageUrl(): string {
    if (this.event && this.event.pictureUrls) {
      const keys = Object.keys(this.event.pictureUrls);
      for (const key of keys) {
        const url = this.event.pictureUrls[key];
        if (url) {
          
          const relativePath = url.replace("E:\\Facultate\\Anul4\\Licenta\\Front\\eventMaker\\src\\", "").replace(/\\/g, '/');
    
          return relativePath;
        }
      }
    }
    
    return 'assets/images/poze/barca.jpg'
  }

  deleteEvent(eventId: string) {
    
   this.deleteEventEmitter.emit(eventId);
  }
  

  editEvent(event: any) {
    this.section.setActiveActivity("editEvent");

    this.eventService.getEventPictures(event.id).subscribe((pictures)=>{
     
         this.imageService.setImageListPath(pictures);
    })
   
    this.eventService.setEventId(event.id);
    this.eventService.setEventWithPictures(event);
    this.popUpService.setCreatEventOpen(true);
    
  }

  getShortDescription(): string {
    if (this.event?.description && this.event.description.length > 50) {
      return this.event.description.substring(0, 55) + '...';
    }
    return this.event?.description || '';
  }
  
  getShortEventName(): string {
    if (this.event?.eventName && this.event.eventName.length > 13) {
      return this.event.eventName.substring(0, 11) + '...';
    }
    return this.event?.eventName || '';
  }
  
}

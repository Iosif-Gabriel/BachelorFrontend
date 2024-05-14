import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ImageModalService } from '../service/modal/image-modal.service';
import { EventDTO } from '../dtos/EventDTO';
import { EventService } from '../service/event/event.service';
import { EventTypeDTO } from '../dtos/EventTypeDTO';
import { LocationDTO } from '../dtos/LocationDTO';
import { LocationService } from '../service/location/location.service';
import { TicketDTO } from '../dtos/TicketDTO';
import { PopupService } from '../service/popup/popup.service';
import { TokenService } from '../service/token/token.service';
import { SectionService } from '../service/section/section.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
 
  @Input() eventData: any;
  isModalOpen:boolean=false;
  showOverlay = false;
  createPopEvent:boolean=false;
  editEvent:boolean=false;
  eventDTO:EventDTO ={
    eventName: '',
    description: '',
    startTime: '',
    endTime: '',
    idLocation: '',
    idEventType: '',
    idUser: ' ',
    price:0,
    nrGuests:0
  }

  locationDTO:LocationDTO={
    address: '',
    city: '',
    country: ''
  }

  eventTypes!:EventTypeDTO[];


  constructor(private sectionService:SectionService,private tokenService:TokenService,private popService:PopupService, private eventService:EventService, private locationService:LocationService){}
  
  ngOnInit(): void {
    this.eventService.getAllEventTypes().subscribe(types => {
      this.eventTypes = types;
    });
    const user=this.tokenService.getUser();
    this.eventDTO.idUser=user.id;
   
    if(this.sectionService.getActiveSection()==='userOrgEvents'){
      
      if(this.sectionService.getActiveActivity()==='editEvent'){
        const eventWithPictures=this.eventService.getEventWithPictures()
        if(eventWithPictures){
       
        this.eventDTO.description=eventWithPictures.description;
        this.eventDTO.eventName=eventWithPictures.eventName;
        this.eventDTO.price=eventWithPictures.price;
        this.eventDTO.startTime=eventWithPictures.startTime;
        this.eventDTO.endTime=eventWithPictures.endTime;
        this.eventDTO.idEventType=eventWithPictures.idEventType;
        this.eventDTO.idLocation=eventWithPictures.idLocation;
        this.eventDTO.nrGuests=eventWithPictures.nrGuests;
        }
      }else{
        this.editEvent=false;
        this.eventDTO.description=''
        this.eventDTO.eventName=''
        this.eventDTO.price=0;
        this.eventDTO.startTime=''
        this.eventDTO.endTime=''
        this.eventDTO.idEventType=''
        this.eventDTO.idLocation=''
        this.eventDTO.nrGuests=0;
      }
    
    
    }
   
  }
  

  onEventTypeChange(event: any) {
    if (event && event.target && event.target.value) {
      this.eventDTO.idEventType = event.target.value;
     
    }
  }

  public handleAddressChange(address: Address) {
  
    if (address && address.address_components) {
        const addressComponents = address.address_components;

      
        const cityComponent = addressComponents.find(comp => comp.types.includes('locality'));
        const countryComponent = addressComponents.find(comp => comp.types.includes('country'));

        if (cityComponent && countryComponent) {
            this.locationDTO.address = address.formatted_address;
            this.locationDTO.city = cityComponent.long_name;
            this.locationDTO.country = countryComponent.long_name;

            
        } else {
            console.error('Unable to find city or country components in address.');
        }
    } else {
        console.error('Invalid address object.');
    }

   
  }


    closeEventCreation():void{
      this.popService.setCreatEventOpen(false);
    }

    onOpenModal(): void {
      this.isModalOpen = true;
      this.eventService.setEventDTO(this.eventDTO);

    }

    
    previewEvent(): void {
      this.onOpenModal();
      
      this.locationService.createLocation(this.locationDTO).subscribe(
        id => {
          console.log('Locația a fost inserată cu succes în baza de date:', id);
          this.eventDTO.idLocation=String(id);
        },
        error => {
          console.error('Eroare la inserarea locației:', error);
         
        }
      );
     
    }

    onCloseModal(): void {
      this.isModalOpen = false; 
    }

    isFormValid(): boolean {
      return !!(
        this.eventDTO.eventName &&
        this.eventDTO.description &&
        this.eventDTO.idEventType &&
        this.eventDTO.nrGuests !== undefined &&
        this.eventDTO.price !== undefined &&
        this.eventDTO.startTime &&
        this.eventDTO.endTime
      );
    }
    
  
  
  
   
    

    
}

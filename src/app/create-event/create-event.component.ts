import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
 
  isModalOpen:boolean=false;
  showOverlay = false;
  createPopEvent:boolean=false;
  eventDTO:EventDTO ={
    eventName: '',
    description: '',
    startTime: '',
    endTime: '',
    idLocation: '',
    idEventType: '',
    idUser: ' ',
    price:0
  }

  locationDTO:LocationDTO={
    address: '',
    city: '',
    country: ''
  }

  eventTypes!:EventTypeDTO[];


  constructor(private tokenService:TokenService,private popService:PopupService, private eventService:EventService, private locationService:LocationService){}
  
  ngOnInit(): void {
    this.eventService.getAllEventTypes().subscribe(types => {
      this.eventTypes = types;
    });
    const user=this.tokenService.getUser();
    this.eventDTO.idUser=user.id;
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
  
  
   
    

    
}

import { AfterContentChecked, AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit,AfterContentChecked   {
 
  @Input() eventData: any;
  isModalOpen:boolean=false;
  showOverlay = false;
  createPopEvent:boolean=false;
  editEvent:boolean=false;
  eventDTO:EventDTO ={
    id:'',
    eventName: '',
    description: '',
    startTime: '',
    endTime: '',
    idLocation: '',
    idEventType: '',
    idUser: ' ',
    price:0,
    nrGuests:0,
    available:false,
  }
  

  locationDTO:LocationDTO={
    address: '',
    city: '',
    country: ''
  }

  eventTypes!:EventTypeDTO[];
  eventForm!: FormGroup;

  constructor(private cdr: ChangeDetectorRef,private sectionService:SectionService,private tokenService:TokenService,private popService:PopupService, private eventService:EventService, private locationService:LocationService){
    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', Validators.required),
      eventDescription: new FormControl('', Validators.required),
      eventType: new FormControl('', Validators.required),
      nrGuests: new FormControl('', [Validators.required, Validators.min(1)]),
      ticketPrice: new FormControl('', [Validators.required, Validators.min(0)]),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required)
    });
 
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
  
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
          this.editEvent=true;
        this.eventForm.get("eventDescription")?.setValue(eventWithPictures.description);
        this.eventForm.get("eventTitle")?.setValue(eventWithPictures.eventName);
        this.eventForm.get("ticketPrice")?.setValue(eventWithPictures.price);
        this.eventForm.get("startDate")?.setValue(eventWithPictures.startTime);
        this.eventForm.get("endDate")?.setValue(eventWithPictures.endTime);
        this.eventForm.get("eventType")?.setValue(eventWithPictures.idEventType);
        this.eventForm.get("location")?.setValue(eventWithPictures.idLocation);
        this.eventForm.get("nrGuests")?.setValue(eventWithPictures.nrGuests);
       
        }
      }else{
        this.editEvent=false;
        this.eventDTO.description=this.eventForm.get("eventDescription")?.value;
        this.eventDTO.eventName=this.eventForm.get("eventTitle")?.value;
        this.eventDTO.price=this.eventForm.get("ticketPrice")?.value;
        this.eventDTO.startTime=this.eventForm.get("startDate")?.value;
        this.eventDTO.endTime=this.eventForm.get("endDate")?.value;
        this.eventDTO.idEventType=this.eventForm.get("eventType")?.value;
        this.eventDTO.idLocation=this.eventForm.get("location")?.value;
        this.eventDTO.nrGuests=this.eventForm.get("nrGuests")?.value;
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
            this.eventForm.get('location')?.setErrors(null); 
        } else {
          
            this.locationDTO.address = '';
            this.locationDTO.city = '';
            this.locationDTO.country = '';
            this.eventForm.get('location')?.setErrors({ 'incompleteLocation': true });
            console.error('Please select a valid location that includes both city and country.');
        }
    } else {
        console.error('Invalid address object.');
        this.eventForm.get('location')?.setErrors({ 'invalidAddress': true });
    }
}



    closeEventCreation():void{
      this.isModalOpen = false;
      this.popService.setCreatEventOpen(false);
      //this.popService.closeCreateEvent.emit();
    }

    onOpenModal(): void {
      this.isModalOpen = true;
      this.popService.setCreatEventOpen(true);
      this.eventService.setEventDTO(this.eventDTO);

    }

    
    previewEvent(): void {
      this.onOpenModal();
    
      this.locationService.createLocation(this.locationDTO).subscribe(
        id => {
          console.log('Locația a fost inserată cu succes în baza de date:', id);
          this.eventDTO.idLocation = String(id);
        
          this.populateEventDTO();
        },
        error => {
          console.error('Eroare la inserarea locației:', error);
        }
      );
    }
    

    populateEventDTO(): void {
      if(this.isFormValid()){
        this.eventDTO.description = this.eventForm.get("eventDescription")?.value;
        this.eventDTO.eventName = this.eventForm.get("eventTitle")?.value;
        this.eventDTO.price = this.eventForm.get("ticketPrice")?.value;
        this.eventDTO.startTime = this.eventForm.get("startDate")?.value;
        this.eventDTO.endTime = this.eventForm.get("endDate")?.value;
        this.eventDTO.idEventType = this.eventForm.get("eventType")?.value;
        this.eventDTO.nrGuests = this.eventForm.get("nrGuests")?.value;
        this.eventService.setEventDTO(this.eventDTO);
      }
   
    }
    

    onCloseModal(): void {
      this.isModalOpen = false; 
    }

    isFormValid(): boolean {
      const startDate = new Date(this.eventForm.value.startDate);
      const endDate = new Date(this.eventForm.value.endDate);
      const currentDate = new Date();
    
      let formErrors: { [key: string]: boolean } = {};
    
      if (this.eventForm.get('startDate')?.value && startDate > endDate ) {
        formErrors = { ...formErrors, 'invalidRange': true };
      }
    
      if (this.eventForm.get('startDate')?.value && startDate < currentDate) {
        formErrors = { ...formErrors, 'invalidStartDate': true };
      }

      if(this.eventForm.get('endDate')?.value && endDate < currentDate || endDate < startDate){
        formErrors = { ...formErrors, 'invalidRange': true };
      }
    
      this.eventForm.get('endDate')?.setErrors(formErrors['invalidRange'] ? { 'invalidRange': true } : null);
      this.eventForm.get('startDate')?.setErrors(formErrors['invalidStartDate'] ? { 'invalidStartDate': true } : null);
    
      return !!(
        this.eventForm.get('eventTitle')?.value &&
        this.eventForm.get('eventDescription')?.value &&
        this.eventForm.get('eventType')?.value &&
        this.eventForm.get('nrGuests')?.value !== undefined &&
        this.eventForm.get('ticketPrice')?.value !== undefined &&
        this.eventForm.get('startDate')?.value &&
        this.eventForm.get('endDate')?.value
      );
    }
    
    
    
    
  
  
  
   
    

    
}

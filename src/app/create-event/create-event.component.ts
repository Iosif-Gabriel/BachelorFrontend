import { Component, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ImageModalService } from '../service/modal/image-modal.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
 
  isModalOpen:boolean=false;
  constructor(private imageModalService:ImageModalService){}
  //Local Variable defined 
  formattedaddress=" "; 
  options={ 
    componentRestrictions:{ 
      country:["AU"] 
    } 
  }

  public handleAddressChange(address: Address) {
        // Do some stuff
  }

closeEventCreation():void{

}

onOpenModal(): void {
  this.isModalOpen = true;
}

    
    previewEvent(): void {
      this.onOpenModal();
    }

    onCloseModal(): void {
      this.isModalOpen = false; 
    }
  
  
   
    

    
}

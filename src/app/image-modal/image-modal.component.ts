import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ImageModalService } from '../service/modal/image-modal.service';
import { EventService } from '../service/event/event.service';
import { EventDTO } from '../dtos/EventDTO';
import { ImageService } from '../service/image/image.service';
import { ModalService } from '../service/modal/modal.service';
import { SectionService } from '../service/section/section.service';
import { PopupService } from '../service/popup/popup.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit{
  @Input() imageUrl: string | undefined; 
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() openModalEvent = new EventEmitter<void>();
  selectedOption: string = "Gallery";
  isGallery:boolean=false;
  eventDTO!:EventDTO;
  imageList: { path: string; file: File }[] = [];
  pictureUrls: { [key: string]: string; }={};
  save=false;

  constructor(private popupService:PopupService,private sectionService:SectionService,private modalService: ImageModalService,private eventService:EventService,private imageService:ImageService,private modalMessage:ModalService,private viewContainerRef: ViewContainerRef) {} // Inject the ModalService
  
  ngOnInit(): void {
    
  }


  saveEvent() {
    this.imageList = this.imageService.getImageList();
    this.eventDTO = this.eventService.getEventDTO();
    const eventId=this.eventService.getEventId();
    this.eventDTO.id=eventId;
    this.save=true;

    if(this.sectionService.getActiveActivity()==='editEvent'){
      console.log(this.imageList);

      this.eventService.patchEvent(this.eventDTO,this.imageList).subscribe(
          (response)=>{
            
            if(response){
              this.modalMessage.openModal("images succ",this.viewContainerRef, 'Event edited succesfully!', "", 'Success');
              this.imageService.setImageListPath({});
              this.imageService.setImageList([]);

            }
            
          },
          error => {
            console.error('Error uploading images:', error);
            
            this.modalMessage.openModal("images err",this.viewContainerRef, 'Error', 'Error updating event. Please try again later.', 'Error');
          }
      )
      
    }else{
    this.eventService.uploadImages(this.eventDTO, this.imageList).subscribe(
      response => {
      
        if (response.message) {
          
          this.modalMessage.openModal("images succ2",this.viewContainerRef, 'Event created succesfully!', 'The event was created! Contratulations!', 'Success');
        }
      },
      error => {
        console.error('Error uploading images:', error);
        
        this.modalMessage.openModal("images err2",this.viewContainerRef, 'Error', 'Upload at least one image. Please try again later.', 'Error');
      }
    );
  }
  }
  
  

  openModal() {
    this.openModalEvent.emit();
  }

  closeImage(){
    this.closeModalEvent.emit();
    this.popupService.setCreatEventOpen(false);
   
  }

  isModalOpen(): boolean {
    return this.modalService.isOpen();
  }
}

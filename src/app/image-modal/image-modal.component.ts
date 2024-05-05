import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { ImageModalService } from '../service/modal/image-modal.service';
import { EventService } from '../service/event/event.service';
import { EventDTO } from '../dtos/EventDTO';
import { ImageService } from '../service/image/image.service';
import { ModalService } from '../service/modal/modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit{
  @Input() imageUrl: string | undefined; // Image URL
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() openModalEvent = new EventEmitter<void>();
  selectedOption: string = "Gallery";
  isGallery:boolean=false;
  eventDTO!:EventDTO;
 imageList: { path: string; file: File }[] = [];
 save=false;

  constructor(private modalService: ImageModalService,private eventService:EventService,private imageService:ImageService,private modalMessage:ModalService,private viewContainerRef: ViewContainerRef) {} // Inject the ModalService
  
  ngOnInit(): void {
    
  }


  saveEvent() {
    this.imageList = this.imageService.getImageList();
    this.eventDTO = this.eventService.getEventDTO();
    this.save=true;
    this.eventService.uploadImages(this.eventDTO, this.imageList).subscribe(
      response => {
        console.log(response); 
        console.log(response.message); 
      
        if (response.message) {
          
          this.modalMessage.openModal(this.viewContainerRef, 'Success', response.message, './assets/images/icons/yes.png');
        }
      },
      error => {
        console.error('Error uploading images:', error);
        
        this.modalMessage.openModal(this.viewContainerRef, 'Error', 'Error uploading images. Please try again later.', './assets/images/icons/cancel.png');
      }
    );
  }
  
  

  openModal() {
    this.openModalEvent.emit();
  }

  closeImage(){
    this.closeModalEvent.emit();
   
  }

  isModalOpen(): boolean {
    return this.modalService.isOpen();
  }
}

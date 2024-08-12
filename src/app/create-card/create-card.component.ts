import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImageService } from '../service/image/image.service';
import { EventService } from '../service/event/event.service';
import { EventDTO } from '../dtos/EventDTO';
import { SectionService } from '../service/section/section.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCardComponent implements OnInit {

  isBackground:boolean = false;
  imageList: { path: string; file: File }[] = [];
  eventDTO!:EventDTO;

  constructor(private sectionService:SectionService,private imageService:ImageService, private eventService:EventService){}
  
  getEventDTO(){
    this.eventDTO=this.eventService.getEventDTO();
  }

  ngOnInit(): void {
    if (this.sectionService.getActiveActivity() === 'editEvent') {
      this.imageService.setPicturesInGallery(this.imageService.getImagesListPath());
      this.isBackground = true;
    }
  
    this.imageList = this.imageService.getImageList();
    this.processImages();
    this.getEventDTO();
  }
  
  private processImages(): void {
    this.imageList.forEach(image => {
      const fileName = image.file.name;
  
      if (fileName.includes('cover')) {
        const position = this.imageService.getPositionFromFileNameIndex(fileName, 0);
        const parentDiv = document.getElementById(position);
  
        if (parentDiv) {
          this.isBackground = true;
          this.imageService.addImageToContainer(image.path, parentDiv);
        }
      }
    });
  }
  
  

  addImage(event: any,position:number):void{
    this.imageService.addImage(event,position);
    this.isBackground=true;
  }

  triggerInput(position:number):void{
    this.imageService.triggerInputClick(position);
 
  }

  removeImage(position:number):void{
    this.imageService.activateInput(position);
    this.isBackground=false;
  }


  
  getShortDescription(): string {
    if (this.eventDTO?.description && this.eventDTO.description.length > 50) {
      return this.eventDTO.description.substring(0, 55) + '...';
    }
    return this.eventDTO?.description || '';
  }


  getShortEventName(): string {
    if (this.eventDTO?.eventName && this.eventDTO.eventName.length > 13) {
      return this.eventDTO.eventName.substring(0, 11) + '...';
    }
    return this.eventDTO?.eventName || '';
  }


}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImageService } from '../service/image/image.service';
import { EventService } from '../service/event/event.service';
import { EventDTO } from '../dtos/EventDTO';

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

  constructor(private imageService:ImageService, private eventService:EventService){}
  
  getEventDTO(){
    this.eventDTO=this.eventService.getEventDTO();
  }

  ngOnInit(): void {
    this.imageList = this.imageService.getImageList();
    this.imageList.forEach(image => {
      const fileName = image.file.name;
     
      if (fileName.includes('cover')) {
        const position = this.imageService.getPositionFromFileName(fileName);
        const parentDiv = document.getElementById(position);
        console.log(parentDiv);
        if (parentDiv) {
          this.isBackground=true;
          this.imageService.addImageToContainer(image.path, parentDiv);
        }
      }
    });
    this.getEventDTO();
    
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


}

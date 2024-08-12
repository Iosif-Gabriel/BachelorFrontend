import { Component, ViewEncapsulation } from '@angular/core';
import { ImageService } from '../service/image/image.service';
import { SectionService } from '../service/section/section.service';
import { EventService } from '../service/event/event.service';

@Component({
  selector: 'app-create-photo-gallery',
  templateUrl: './create-photo-gallery.component.html',
  styleUrls: ['./create-photo-gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePhotoGalleryComponent {
  
  selectedImageUrl!: string;
  imageList: { path: string; file: File }[] = [];
  isMain:boolean=false;

  constructor(private sectionService:SectionService,private imageService: ImageService) { }


  ngOnInit(): void {
    if (this.sectionService.getActiveActivity() === 'editEvent') {
      this.imageService.setPicturesInGallery(this.imageService.getImagesListPath());
    }
  
    this.imageList = this.imageService.getImageList();
    this.processImages();
  }
  
  private processImages(): void {
    this.imageList.forEach(image => {
      const position = this.imageService.getPositionFromFileNameIndex(image.file.name, 0);
      const parentDiv = document.getElementById(position);
      if (parentDiv) {
        this.imageService.addImageToContainer(image.path, parentDiv);
      }
    });
  }
  

    
  removeImage(positionId: string): void {
    this.imageService.removeImage(positionId);
  }


  trigger(position :number):void {
    this.imageService.triggerInputClick(position);
  }

  activateInput(position:number):void{
    if(position==3){
      this.isMain=true
    }
    this.imageService.activateInput(position);
    
  }

  addImage(event:any,position:number):void{
    this.imageService.addImage(event,position);
  }

 
  
  
}

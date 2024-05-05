import { Component, ViewEncapsulation } from '@angular/core';
import { ImageService } from '../service/image/image.service';

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

  constructor(private imageService: ImageService) { }


  ngOnInit(): void {
    
    this.imageList=this.imageService.getImageList();
    this.imageList.forEach(image => {
      const position = this.imageService.getPositionFromFileName(image.file.name);
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

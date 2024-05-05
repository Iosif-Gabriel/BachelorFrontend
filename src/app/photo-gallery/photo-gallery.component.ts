import { Component, ViewEncapsulation } from '@angular/core';
import { ImageService } from '../service/image/image.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PhotoGalleryComponent {
  pictureUrls!:{ [key: string]: string };
  selectedImageUrl!: string;
  mainPhoto: any;
  imageList: { path: string; file: File }[] = [];
  isMain:boolean=false;

  constructor(private imageService: ImageService) { }

 


  ngOnInit(): void {
    
    this.imageList = this.imageService.getImageList();
    this.pictureUrls=this.imageService.getImagesListPath();
    Object.keys(this.pictureUrls).forEach(key => {
      const url = this.pictureUrls[key];
     if(url!=null){
      const relativePath = url.replace("E:\\Facultate\\Anul4\\Licenta\\Front\\eventMaker\\src\\", "").replace(/\\/g, '/');
      const parts = relativePath.split("/");
      const filename = parts && parts.length > 0 ? parts[parts.length - 1] : '';
      const position = this.imageService.getPositionFromFileName(filename);
      const parentDiv = document.getElementById(position);
   
      if (parentDiv) {
            this.imageService.addImageToContainer(relativePath, parentDiv);
          }
     }
  })
    // this.imageList.forEach(image => {
    //   const position = this.imageService.getPositionFromFileName(image.file.name);
    //   const parentDiv = document.getElementById(position);
    //   if (parentDiv) {
    //     this.imageService.addImageToContainer(image.path, parentDiv);
    //   }
    // });
  }

  
 
  
  

}

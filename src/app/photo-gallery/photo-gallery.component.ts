import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PhotoGalleryComponent {
  uploadedImages: { file: File, url: string }[] = [];
  selectedImageUrl!: string;
  mainPhoto: any;
  

  constructor() { }

  ngOnInit(): void {
    // Initialize component properties or perform other setup tasks here
  }


  imageList: { path: string; file: File }[] = [];



  addImage(event: any, position: number): void {
    const imageInput = event.target as HTMLInputElement;
    const images: FileList | null = imageInput.files;
  
    if (!images || images.length === 0) {
      return;
    }
  
    const file = images.item(0)!;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('preview-image');
   
      const parentDiv = document.getElementById(this.getPositionId(position));
    
      if (parentDiv) {
        parentDiv.style.position = 'relative';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0'; 
        img.style.width = '100%'; 
        img.style.height = '100%'; 
        img.style.objectFit = 'cover';
        parentDiv.appendChild(img);
        
        const newName = `${this.getPositionId(position)}_${file.name}`;
        console.log(newName);
        const newFile = new File([file], newName, { type: file.type, lastModified: file.lastModified });
  
        
        this.imageList.push({ path: e.target.result, file: newFile });
        console.log(this.imageList);
      }
    };
    reader.readAsDataURL(file);
}

  
  getPositionId(position: number): string {
    switch (position) {
      case 1:
        return 'upLeft';
      case 2:
        return 'downLeft';
      case 3:
        return 'upRight';
      case 4:
        return 'downRight';
      case 5:
        return 'main';
      default:
        return '';
    }
  }
  

  createImageInput(id: string, position: number): HTMLInputElement {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.id = id;
    inputElement.name = id;
    inputElement.accept = 'image/*';
    inputElement.style.display = 'none';
    inputElement.addEventListener('change', (event) => this.addImage(event, position));
    return inputElement;
  }
  
  activateInput(event: MouseEvent, position: number): void {
    const positionId = this.getPositionId(position);
    const querySelectorId = '#' + positionId + ' img';
    
    const previewImage = document.querySelector(querySelectorId) as HTMLImageElement | null;
    if (previewImage) {
      previewImage.remove();

       this.imageList = this.imageList.filter(image => !image.file.name.includes(positionId));
       console.log(this.imageList);

      const inputElement = this.createImageInput(positionId + 'PhotoUpload', position);
      const divMain = document.getElementById(positionId);
      if (divMain) {
        divMain.appendChild(inputElement);
      }
    }
  }

  triggerInputClick(position: number): void {
     const positionId = this.getPositionId(position);
     const querySelector=positionId+"Upload";
    const inputElement = document.getElementById(querySelector) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.click();
    }
  }
  
  
  
  




}

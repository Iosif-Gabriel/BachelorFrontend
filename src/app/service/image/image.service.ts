import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  private imageList: { path: string; file: File }[] = [];
  pictureUrls!:{ [key: string]: string };

  constructor() { }

  setImageListPath(pictureUrls:{ [key: string]: string }) {
    this.pictureUrls = pictureUrls;
    //console.log(this.pictureUrls);
  }

  getImagesListPath(){
    return this.pictureUrls;
  }

  setPicturesInGallery(pictureUrls:{ [key: string]: string }){
    const keys = Object.keys(pictureUrls);
      for (const key of keys) {
        const url = pictureUrls[key];
        if (url) {
          
          const relativePath = url.replace("E:\\Facultate\\Anul4\\Licenta\\Front\\eventMaker\\src\\", "").replace(/\\/g, '/');
          const parts = relativePath.split("/");
          const filename = parts && parts.length > 0 ? parts[parts.length - 1] : '';
          const position = this.getPositionFromFileNameIndex(filename,1);
          const parentDiv = document.getElementById(position);
    
          if (parentDiv) {
            this.addImageToContainer(relativePath, parentDiv);
          }
         
        }
      }

     
  }


  addImageTolist(path: string, file: File): void {
    this.imageList.push({ path, file });
  }

  removeImage(positionId: string): void {
    this.imageList = this.imageList.filter(image => !image.path.includes(positionId));
  }

  getImageList(): { path: string; file: File }[] {
    return this.imageList;
  }

  public setImageList(images: { path: string; file: File }[]): void {
    this.imageList = images;
}


  getPositionFromFileNameIndex(fileName: string, index: number): string {
    const parts = fileName.split('_');
    return parts[index];
}
  
  addImageToContainer(imagePath: string, container: HTMLElement): void {
    const img = document.createElement('img');
    img.src = imagePath;
    img.classList.add('preview-image');
    this.setStyleForImage(img);
    container.style.position = 'relative';
    container.appendChild(img);
  }


  setStyleForImage(img: HTMLImageElement): void {
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0'; 
    img.style.width = '100%'; 
    img.style.height = '100%'; 
    img.style.borderRadius='20px';
    // img.style.zIndex='9999';
    img.style.objectFit='fill';
    
  }


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
        
        this.setStyleForImage(img);

        parentDiv.appendChild(img);
        
        const newName = `${this.getPositionId(position)}_${file.name}`;
        
        const newFile = new File([file], newName, { type: file.type, lastModified: file.lastModified });
      
        this.addImageTolist(e.target.result,newFile);
     
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
      case 6:
        return 'cover';
      default:
        return '';
    }
  }
  
  activateInput( position: number): void {
    const positionId = this.getPositionId(position);
    const querySelectorId = '#' + positionId + ' img';
    
    const previewImage = document.querySelector(querySelectorId) as HTMLImageElement | null;
    if (previewImage) {
      previewImage.remove();

      this.removeImage(positionId);
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

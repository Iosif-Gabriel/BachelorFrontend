import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  private favButton!: ElementRef;

  constructor() { }

  setFavButton(elementRef: ElementRef): void {
    this.favButton = elementRef;
  }


  addToFavorites(event: any,heart:string) {
    const buttonId = 'fav_' + event.id;
    const favButton = document.getElementById(buttonId);
    
    if (favButton) {
      if (event.fav === false) {
        favButton.classList.remove(heart);
      } else if(event.fav===true) {
        favButton.classList.add(heart);
      }
    }
    
  }

  isfavouritee(event: any,heart:string) {

    if (this.favButton) {
     
      if (event.fav === true) {
        this.favButton.nativeElement.classList.remove(heart);
      } else if (event.fav === false) {
        this.favButton.nativeElement.classList.add(heart);
      }
    }
  }
  
}

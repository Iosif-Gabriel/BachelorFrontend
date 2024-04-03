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
  images: string[] = [
    '../assets/images/poze/camping.jpg',
    '../assets/images/poze/barca.jpg',
    '../assets/images/poze/lala.jpg',
    '../assets/images/poze/hihi.jpg',
    '../assets/images/poze/haha.jpg',
    '../assets/images/poze/tanti.jpg',
    '../assets/images/poze/hihi.jpg',
    '../assets/images/poze/lililala.jpg',
    '../assets/images/poze/tanti.jpg',
    '../assets/images/poze/barca.jpg'
    // Add more images here
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize component properties or perform other setup tasks here
  }

  selectedImage: string = this.images[0];

  selectImage(image: string): void {
    this.selectedImage = image;
  }

openImageUploader(position: number): void {
    // Implementează funcționalitatea pentru încărcarea imaginilor și adăugarea lor în poziția specificată
    // Poți utiliza un serviciu, o modalitate de încărcare de fișiere sau alte metode pentru a adăuga imaginile
    console.log('Open image uploader for position:', position);
  }

  handleFileInput(event: any, position: number): void {
    const fileInput = event.target as HTMLInputElement;
    const files: FileList | null = fileInput.files;
  
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)!;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.classList.add('preview-image'); // Adăugăm clasa pentru stilizare
  
          // Setăm dimensiunile imaginii relativ la dimensiunile div-ului părinte
          const parentDiv = position === 5 ? document.querySelector('.main-photo') : document.querySelectorAll('.small-photo')[position];
          if (parentDiv) {
            const parentRect = parentDiv.getBoundingClientRect();
            img.style.width = `${parentRect.width}px`;
            img.style.height = `${parentRect.height}px`+150;
          }
  
          img.style.borderRadius = '20px';
          img.style.margin = '10px';
  
          if (position === 5) {
            const mainPhotoDiv = document.querySelector('.main-photo');
            if (mainPhotoDiv) {
              mainPhotoDiv.innerHTML = ''; // Ștergem orice conținut anterior al div-ului
              mainPhotoDiv.appendChild(img); // Adăugăm imaginea încărcată în div-ul corespunzător
            } else {
              console.error('Elementul cu clasa "main-photo" nu a fost găsit.');
            }
          } else {
            const smallPhotoDiv = document.querySelectorAll('.small-photo')[position];
            if (smallPhotoDiv) {
              smallPhotoDiv.innerHTML = ''; // Ștergem orice conținut anterior al div-ului
              smallPhotoDiv.appendChild(img); // Adăugăm imaginea încărcată în div-ul corespunzător
            } else {
              console.error('Elementul cu clasa "small-photo" și poziția specificată nu a fost găsit.');
            }
          }
  
        };
        reader.readAsDataURL(file);
      }
    } else {
      console.error('Nu s-au găsit fișiere pentru a fi încărcate.');
    }
  }

}

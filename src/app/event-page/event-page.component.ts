import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event/event.service';
import { ImageService } from '../service/image/image.service';
import { PopupService } from '../service/popup/popup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]

})
export class EventPageComponent implements OnInit,OnDestroy{

  event!: EventWithPicturesDTO;
  pictureUrl!:{ [key: string]: string };
  purchaseForm!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,private imageService:ImageService,private popUpService:PopupService) {}

  ngOnDestroy(): void {
    this.popUpService.setisEventPageOpen(false);
  }

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const eventId = params['id'];

      this.eventService.getEventById(eventId).subscribe(event => {
        this.event = event;
        this.popUpService.setisEventPageOpen(true);
        this.pictureUrl = event.pictureUrls;
        this.imageService.setImageListPath(this.pictureUrl);

        // Actualizați valorile formularului cu valorile de start și de sfârșit ale evenimentului
        this.purchaseForm.patchValue({
          startDate: this.event.startTime,
          endDate: this.event.endTime
        });
      });
    });
  }


  reviews: any[] = [
    { 
      author: 'John Doe',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Great Experience!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
    { 
      author: 'LALA',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Great Experience!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
    { 
      author: 'LILI',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Great Experience!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
    { 
      author: 'John Doe',
      date: 'June 1, 2000',
      rating: '★★★★☆',
      title: 'Foarte frumos frate',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur ipsum, sed dapibus eros.'
    },
  ];

  prevSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: -scrollDistance + 30, // Adăugați un mic decalaj pentru a compensa animația
      behavior: 'smooth' // Folosiți scroll smooth
    });
  }
  
  nextSet() {
    const reviewList = document.querySelector('.review-list') as HTMLElement;
    const scrollDistance = reviewList.scrollWidth / reviewList.children.length;
    
    reviewList.scrollBy({
      left: scrollDistance - 30, // Adăugați un mic decalaj pentru a compensa animația
      behavior: 'smooth' // Folosiți scroll smooth
    });
  }

}

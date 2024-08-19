import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  animations: [
    trigger('starAnimation', [
      state('active', style({
        color: 'gold',
        transform: 'scale(1.5)'
      })),
      state('inactive', style({
        color: 'black',
        transform: 'scale(1)'
      })),
      transition('inactive <=> active', animate('100ms ease-in'))
    ])
  ]
})
export class StarRatingComponent implements OnInit {
  @Input() rating!: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  stars: boolean[] = [];

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.highlightStars(this.rating - 1);
    }
  }

  ngOnInit() {
    this.stars = Array(5).fill(false);
    this.highlightStars(this.rating - 1);
  }

  setRating(index: number) {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
    this.highlightStars(index);
  }

  highlightStars(index: number) {
    this.stars = this.stars.map((_, i) => i <= index);
  }
}

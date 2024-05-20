import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() review!: {
    userName: string,
    date: string,
    rating: string,
    subject: string,
    description: string
  };

  getNumericRating(): number {
    return parseInt(this.review.rating);
  }
}

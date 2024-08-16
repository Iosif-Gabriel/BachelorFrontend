import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { EventService } from '../service/event/event.service';
import { OrderService } from '../service/order/order.service';
import { UserService } from '../service/user/user.service';
import { FeedbackService } from '../service/feedback/feedback.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  eventCount$!: Observable<number>;
  orderCount$!: Observable<number>;
  userCount$!: Observable<number>;
  reviewCount$!: Observable<number>;

  constructor(
    private eventService: EventService,
    private orderService: OrderService,
    private userService: UserService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.eventCount$ = this.eventService.getAllEvents().pipe(
      map(events => events.length)
    );

    this.orderCount$ = this.orderService.getAllOrders().pipe(
      map(orders => orders.length)
    );

    this.userCount$ = this.userService.getAllUsers().pipe(
      map(users => users.length)
    );

    this.reviewCount$ = this.feedbackService.getAllFeedback().pipe(
      map(feedbacks => feedbacks.length)
    );
  }
}

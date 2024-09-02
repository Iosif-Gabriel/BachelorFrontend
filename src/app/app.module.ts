import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './components/auto-auth-components/login-component/login-component.component';
import { RegisterComponentComponent } from './components/auto-auth-components/register-component/register-component.component';
import { NavComponentComponent } from './components/nav-component/nav-component.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { UserPageComponent } from './components/user-page/user-page.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { EventCardComponent } from './components/event-components/event-card/event-card.component';
import { EventListComponent } from './components/event-components/event-list/event-list.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { PhotoGalleryComponent } from './components/event-components/photo-gallery/photo-gallery.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { PurchaseComponent } from './components/event-components/purchase/purchase.component';
import { ReviewComponent } from './components/review-components/review/review.component';
import { ToolTipDirective } from './directives/tool-tip/tool-tip.directive';
import { ScrollOnWheelDirective } from './directives/scroll/scroll-on-wheel.directive';
import { CreateEventComponent } from './components/create/create-event/create-event.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { ImageModalComponent } from './components/create/image-modal/image-modal.component';
import { CreateCardComponent } from './components/create/create-card/create-card.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CreatePhotoGalleryComponent } from './components/create/create-photo-gallery/create-photo-gallery.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { MatTableModule } from '@angular/material/table';
import { CreateReviewComponent } from './components/create/create-review/create-review.component';
import {  StarRatingModule } from 'angular-star-rating';
import {MatCardModule} from '@angular/material/card';
import { StarRatingComponent } from './components/review-components/star-rating/star-rating.component';
import { RxStompService } from '@stomp/ng2-stompjs';
import { NotificationComponent } from './components/notification-component/notification.component';
import { ReviewListComponent } from './components/review-components/review-list/review-list.component';
import { UserOrdersComponent } from './components/user-subpages/user-orders/user-orders.component';
import { UserEventsComponent } from './components/user-subpages/user-events/user-events.component';
import { UserFavComponent } from './components/user-subpages/user-fav/user-fav.component';
import { UserReviewsComponent } from './components/user-subpages/user-reviews/user-reviews.component';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { NgxStripeModule } from 'ngx-stripe';
import { CancelComponent } from './components/payment-pages/cancel/cancel.component';
import { SuccessComponent } from './components/payment-pages/success/success.component';
import { VerifyComponent } from './components/auto-auth-components/verify-component/verify.component';
import { DropdownModule } from 'primeng/dropdown';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EventsChartComponent } from './components/admin-pages/events-chart/events-chart.component';
import { UsersChartComponent } from './components/admin-pages/users-chart/users-chart.component';
import { OrdersChartComponent } from './components/admin-pages/orders-chart/orders-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './components/user-subpages/user-profile/user-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    NavComponentComponent,
    ModalComponent,
    UserPageComponent,
    SideNavComponent,
    EventCardComponent,
    EventListComponent,
    ImageSliderComponent,
    EventPageComponent,
    PhotoGalleryComponent,
    UserNavComponent,
    PurchaseComponent,
    ReviewComponent,
    ToolTipDirective,
    ScrollOnWheelDirective,
    CreateEventComponent,
    AdminhomeComponent,
    ImageModalComponent,
    CreateCardComponent,
    CreatePhotoGalleryComponent,
    OrderPageComponent,
    CreateReviewComponent,
    StarRatingComponent,
    NotificationComponent,
    ReviewListComponent,
    UserOrdersComponent,
    UserEventsComponent,
    UserFavComponent,
    UserReviewsComponent,
    CancelComponent,
    SuccessComponent,
    VerifyComponent,
    EventsChartComponent,
    UsersChartComponent,
    OrdersChartComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NgxChartsModule,
    CommonModule,
    MatMenuModule,
    MatTableModule,
    StarRatingModule,
    FontAwesomeModule,
    MatCardModule,
    DropdownModule,
    SimpleNotificationsModule.forRoot(),
    NgxStripeModule.forRoot(),
    
  ],
  exports: [
    NotificationComponent
  ],
  providers: [RxStompService,NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

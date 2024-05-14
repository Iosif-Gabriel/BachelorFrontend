import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { UserPageComponent } from './user-page/user-page.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventListComponent } from './event-list/event-list.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { EventPageComponent } from './event-page/event-page.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ReviewComponent } from './review/review.component';
import { ToolTipDirective } from './directives/tool-tip.directive';
import { ScrollOnWheelDirective } from './directives/scroll/scroll-on-wheel.directive';
import { CreateEventComponent } from './create-event/create-event.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CreatePhotoGalleryComponent } from './create-photo-gallery/create-photo-gallery.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { MatTableModule } from '@angular/material/table';
import { CreateReviewComponent } from './create-review/create-review.component';
import {  StarRatingModule } from 'angular-star-rating';
import {MatCardModule} from '@angular/material/card';
import { StarRatingComponent } from './star-rating/star-rating.component';


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
    CommonModule,
    MatMenuModule,
    MatTableModule,
    StarRatingModule,
    MatCardModule,

  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

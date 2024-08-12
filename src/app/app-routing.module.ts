import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { EventPageComponent } from './event-page/event-page.component';
import { UserEventsComponent } from './user-subpages/user-events/user-events.component';
import { UserFavComponent } from './user-subpages/user-fav/user-fav.component';
import { UserOrdersComponent } from './user-subpages/user-orders/user-orders.component';
import { UserReviewsComponent } from './user-subpages/user-reviews/user-reviews.component';
import { SuccessComponent } from './payment/success/success.component';
import { CancelComponent } from './payment/cancel/cancel.component';

const routes: Routes = [
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },
  {path:'home',component:HomePageComponent},
  {path:'userHome',component:UserPageComponent},
  {path: 'event/:id', component: EventPageComponent },
  {path:'userCreatedEvents',component:UserEventsComponent},
  {path:'userFavEvents',component:UserFavComponent},
  {path:'userOrders',component:UserOrdersComponent},
  {path:'userFeedback',component:UserReviewsComponent},
  {path:'adminHome',component:AdminhomeComponent,canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

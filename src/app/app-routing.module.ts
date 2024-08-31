import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { UserEventsComponent } from './components/user-subpages/user-events/user-events.component';
import { UserFavComponent } from './components/user-subpages/user-fav/user-fav.component';
import { UserOrdersComponent } from './components/user-subpages/user-orders/user-orders.component';
import { UserReviewsComponent } from './components/user-subpages/user-reviews/user-reviews.component';
import { SuccessComponent } from './components/payment-pages/success/success.component';
import { CancelComponent } from './components/payment-pages/cancel/cancel.component';
import { EventsChartComponent } from './components/admin-pages/events-chart/events-chart.component';
import { UsersChartComponent } from './components/admin-pages/users-chart/users-chart.component';
import { OrdersChartComponent } from './components/admin-pages/orders-chart/orders-chart.component';
import { UserProfileComponent } from './components/user-subpages/user-profile/user-profile.component';

const routes: Routes = [
  {path:'success', component: SuccessComponent },
  {path:'cancel', component: CancelComponent },
  {path:'home',component:HomePageComponent},
  {path:'userHome',component:UserPageComponent},
  {path:'event/:id', component: EventPageComponent },
  {path:'userCreatedEvents',component:UserEventsComponent},
  {path:'userFavEvents',component:UserFavComponent},
  {path:'userOrders',component:UserOrdersComponent},
  {path:'userFeedback',component:UserReviewsComponent},
  {path:'userProfile/:id/:userName',component:UserProfileComponent},
  {path:'adminHome',component:AdminhomeComponent,canActivate: [AuthGuard]},
  {path:'eventsStats',component:EventsChartComponent,canActivate:[AuthGuard]},
  {path:'usersStats',component:UsersChartComponent,canActivate:[AuthGuard]},
  {path:'ordersStats',component:OrdersChartComponent,canActivate:[AuthGuard]},
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}

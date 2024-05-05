import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { EventPageComponent } from './event-page/event-page.component';

const routes: Routes = [
  {path:'home',component:HomePageComponent},
  {path:'userHome',component:UserPageComponent},
  { path: 'event/:id', component: EventPageComponent },
  {path:'adminHome',component:AdminhomeComponent,canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '#', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { LogoutService } from './service/logout/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eventMaker';
  constructor(private logoutService: LogoutService){}
  
}

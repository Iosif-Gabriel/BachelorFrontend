import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { LogoutService } from './service/logout/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eventMaker';
  constructor(){}

  ngOnInit(): void {
    
  }


  
}

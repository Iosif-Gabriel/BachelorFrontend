import { Component } from '@angular/core';
import { LogoutService } from '../service/logout/logout.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(private logoutService:LogoutService) {
    
  }

  logoutUser(){
    
    this.logoutService.logoutUserNow();
  }

}

import { Component } from '@angular/core';
import { HostListener, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupService } from '../../service/popup/popup.service';





@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent {
  

  constructor(private loginPopupService: PopupService) {}

  openLoginPopup(): void {
    this.loginPopupService.openPopup();
  }

  openRegisterPopup(): void{
    this.loginPopupService.openRegisterPopup();
  }
}

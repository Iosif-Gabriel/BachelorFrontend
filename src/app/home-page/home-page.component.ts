import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupService } from '../service/popup/popup.service';
import { ModalService } from '../service/modal/modal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  textArray: string[] = ["Text 1", "Text 2", "Text 3", "Text 4"];
  textArray2: string[] = ["Guide", "Buddy", "Travel companion"];
  currentIndex = 0;
  currentText: string='';

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  modalSubscription!: Subscription;

  loginPopupOpen: boolean = false;
  registerPopupOpen: boolean =false;
  isRegisterPressed: boolean=false;

  constructor(private loginPopupService: PopupService) {}

  ngOnDestroy(): void {
    
  }


  ngOnInit(): void {

    this.loginPopupService.isOpen.subscribe(isOpen => {
      this.loginPopupOpen = isOpen;
      
    });

    this.loginPopupService.isRegisterOpen.subscribe(isRegisterOpen =>{
      
      this.registerPopupOpen=isRegisterOpen;
    });

    this.loginPopupService.isRegisterButtonPressed.subscribe(isRegisterPressed => {
      this.isRegisterPressed = isRegisterPressed;
    
    });
  

    this.updateFirstQuestion();
    setInterval(() => {
      this.updateFirstQuestion();
    }, 6000); 

  }



  updateText(): void {
    this.currentText = this.textArray[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.textArray.length;
  
  }

  updateFirstQuestion(): void {
    this.currentText = this.textArray2[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.textArray2.length;
    
  }
}

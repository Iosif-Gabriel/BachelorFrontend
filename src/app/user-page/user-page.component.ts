import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { PopupService } from '../service/popup/popup.service';
import { SectionService } from '../service/section/section.service';
import { WebSocketService } from '../service/websocket/web-socket.service';
import { TokenService } from '../service/token/token.service';
import { LogoutService } from '../service/logout/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  createPop:boolean=false;
  userOrgEvents:boolean=false;
  orderOpen:boolean=false;

  constructor(private tokenService:TokenService,private wesocketService:WebSocketService,private sectionService: SectionService,private popupService:PopupService) {}
  
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user) {
      this.popupService.isCreatEventOpen.subscribe(create => {
        this.createPop = create;
      });
      this.wesocketService.receiveMessages(user.id).subscribe((mess: any) => {
        console.log(mess);
      });
      this.popupService.setisEventPageOpen(false);
    }
  }


  isActiveSection(section: string): boolean {
    return this.sectionService.getActiveSection() === section;
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const navBar = document.querySelector('.navBar') as HTMLElement; // selectează bara de navigare
    if (window.scrollY > 100) { // Schimbă 100 cu poziția la care vrei să apară animația
        navBar.classList.add('hidden');
    } else {
        navBar.classList.remove('hidden');
    }
  }

  getEventMessage(): string {
    return this.sectionService.getEventMessage();
  }



  getMyOrdersMessage():string{
    return this.sectionService.getOrdersMessage();
  }

  getSeachMessage():boolean{
    return this.sectionService.getEventsFound();
  }

  getFavMessage():string{
    return this.sectionService.getFavEvents();
  }
}

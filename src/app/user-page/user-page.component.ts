import { Component, OnDestroy, OnInit } from '@angular/core';

import { PopupService } from '../service/popup/popup.service';
import { SectionService } from '../service/section/section.service';
import { WebSocketService } from '../service/websocket/web-socket.service';
import { TokenService } from '../service/token/token.service';
import { NotificationService } from '../service/notification/notification.service';
import { NotificationDTO } from '../dtos/NotificationDTO';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  createPop:boolean=false;
  userOrgEvents:boolean=false;
  orderOpen:boolean=false;

  constructor(private _service: NotificationsService,private notService:NotificationService,private tokenService:TokenService,private wesocketService:WebSocketService,private sectionService: SectionService,private popupService:PopupService) {}
  
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user) {
      this.popupService.isCreatEventOpen.subscribe(create => {
        this.createPop = create;
      });
     this.wesocketService.receiveMessages(user.id).subscribe((mess: NotificationDTO) => {
        this.notService.addNotificationDTO(mess);
        this.createNot(mess.type,mess.message);
      
      }); 
      this.popupService.setisEventPageOpen(false);
    }
  }


  createNot(title:string,content:string): void {
   
    this._service.create(title, content);
  }

  isActiveSection(section: string): boolean {
    return this.sectionService.getActiveSection() === section;
  }


 
  getEventMessage(): string {
    return this.sectionService.getEventMessage();
  }

  getSeachMessage():boolean{
    return this.sectionService.getEventsFound();
  }


}

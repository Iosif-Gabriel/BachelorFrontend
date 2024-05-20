import { Component, OnInit } from '@angular/core';
import { NotificationDTO } from '../dtos/NotificationDTO';
import { NotificationService } from '../service/notification/notification.service';
import { TokenService } from '../service/token/token.service';
import { SectionService } from '../service/section/section.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../service/popup/popup.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications:NotificationDTO[]=[];
  reviewB:boolean=false;
  eventData={
    eventName:'',
    eventId:'',
  }
  

  constructor( private popupSerivce:PopupService,private notifyService:NotificationService,private tokenS:TokenService){
    this.popupSerivce.closeCreateReview.subscribe(()=>{
      this.closeReview();
    })
  }

  ngOnInit(): void {
    const user=this.tokenS.getUser();
    this.notifyService.getUserNotifications(user.id).subscribe(notifys=>{
      console.log(notifys);
      this.notifications=notifys;
    })

  }

  clickOnNotification(noti:any){
   if(noti.type==='review'){
    this.reviewB=true;
    this.eventData={
      eventId:noti.eventId,
      eventName:noti.eventName
    }
   }
  }

  closePopup(){
  
    this.popupSerivce.closeNotification.emit();
  }

  closeReview(){
    this.reviewB=false;
  }

}

import { Component, OnInit } from '@angular/core';
import { NotificationDTO } from '../../dtos/NotificationDTO';
import { NotificationService } from '../../service/notification/notification.service';
import { TokenService } from '../../service/token/token.service';
import { PopupService } from '../../service/popup/popup.service';

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
    const user = this.tokenS.getUser();
    this.notifyService.getUserNotifications(user.id).subscribe(notifys => {
      this.notifyService.setNotificationDTO(notifys);
    });

    this.notifyService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  clickOnNotification(noti:any){
    if(noti.seen!==true){
      if(noti.type==='review'){
        this.reviewB=true;
       
        this.eventData={
          eventId:noti.eventId,
          eventName:noti.message.replace("Please review",'')
        }
        console.log(this.eventData);
       }
    }
  
  }

  closePopup(){
  
    this.popupSerivce.closeNotification.emit();
  }

  closeReview(){
    this.reviewB=false;
  }

  setSeenNotification(event:Event,noti:NotificationDTO){
    event.stopPropagation();
    noti.seen=true;
    this.notifyService.setSeenNotification(noti.id).subscribe(response=>{
      console.log(response);
    })
  }

  deleteNotification(event:Event,notiId: string) {
    event.stopPropagation();
    const index = this.notifications.findIndex(notification => notification.id === notiId);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  
    this.notifyService.deleteNotification(notiId).subscribe(response => {
      if (!response.success) {
        console.log("Error deleting notification:", response.error);
        
      }
    });
  }
  

}

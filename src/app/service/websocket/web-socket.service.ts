import { Injectable } from '@angular/core';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { IMessage } from '@stomp/rx-stomp';
import { Observable } from 'rxjs';
import { NotificationDTO } from 'src/app/dtos/NotificationDTO';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompConfig: StompConfig;
  private stompService: StompService;

  constructor() { this.stompConfig = {
    url: 'ws://localhost:8080/eventMaker',
    headers: {},
    heartbeat_in: 0,
    heartbeat_out: 20000,
    reconnect_delay: 5000,
    debug: true,
  };

  this.stompService = new StompService(this.stompConfig);
  }

  connectToWebSocket(userId: string): void {
   
    const destination = `/app/connect/${userId}`;
    this.stompService.publish({ destination ,body: userId });
  }

  disconnectWebSocket(userId: string): void {
   
    const destination = `/app/disconnect/${userId}`;
    this.stompService.publish({ destination ,body: userId});
    this.closeConnection();
  }

  closeConnection(): void {
    if (this.stompService && this.stompService.connected()) {
      this.stompService.disconnect();
      this.stompService = new StompService(this.stompConfig); 
    }
  }

  sendNotification(userId: string, message: NotificationDTO): void {
    const noti={
      userId:userId,
      message:message,
      type:"order",
      seen:false
    }
   
    const destination = `/app/sendNotification/${userId}`;
    this.stompService.publish({ destination, body: JSON.stringify(message) });
  }

  receiveMessages(userId:String): Observable<any> {
  
    return new Observable<any>((observer) => {
      this.stompService.subscribe(`/topic/check2/${userId}`).subscribe((message) => {
       
        const notificationDTO: NotificationDTO = JSON.parse(message.body);

        observer.next(notificationDTO);
      });
    });
  }



}

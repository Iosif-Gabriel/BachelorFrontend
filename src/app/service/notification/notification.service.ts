import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationDTO } from 'src/app/dtos/NotificationDTO';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications:NotificationDTO[]=[];
  private notificationsSubject = new BehaviorSubject<NotificationDTO[]>(this.notifications);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(private auth:AuthService,private http:HttpClient,private tokenService:TokenService) { }

  setNotificationDTO(notifications: NotificationDTO[]): void {
    this.notifications = notifications;
    this.notificationsSubject.next(this.notifications);
  }

  getNotificationDTO(): NotificationDTO[]  {
    return this.notifications;
  }

  addNotificationDTO(not: NotificationDTO): void {
  
    this.notifications.push(not);
    this.notificationsSubject.next(this.notifications);
  }

  getUserNotifications(userId:string):Observable<NotificationDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getNotifiURL=`https://localhost:8080/notify/getUserNotifications/${userId}`
    return this.http.get<NotificationDTO[]>(getNotifiURL,{headers});
  }

  deleteNotification(notiId: string): Observable<any> {
    const headers = this.auth.createAuthHeaders();
    const deleteNotificationUrl = `https://localhost:8080/notify/deleteUserNotification/${notiId}`;
    return this.http.delete(deleteNotificationUrl, { headers });
  }  
}

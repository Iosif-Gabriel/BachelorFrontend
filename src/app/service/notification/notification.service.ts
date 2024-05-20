import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { NotificationDTO } from 'src/app/dtos/NotificationDTO';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private auth:AuthService,private http:HttpClient,private tokenService:TokenService) { }


  getUserNotifications(userId:string):Observable<NotificationDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getNotifiURL=`http://localhost:8080/notify/getUserNotifications/${userId}`
    return this.http.get<NotificationDTO[]>(getNotifiURL,{headers});
  }
}

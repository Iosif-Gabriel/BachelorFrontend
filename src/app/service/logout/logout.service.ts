import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../websocket/web-socket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {



  private logoutUrl = 'https://localhost:8080/api/auth/logout';

  constructor(private httpClient: HttpClient, private tokenService: TokenService,private websocketService:WebSocketService) { }

  logoutUser(): Observable<any> {
    let user = this.tokenService.getUser();
    console.log(user);
    let token = this.tokenService.getToken();
    console.log("Logout token " + token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.post<any>(this.logoutUrl, user,requestOptions);
  }


}

import { HostListener, Injectable } from '@angular/core';
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
  private logoutTimer: any;

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

  logoutUserNow(){
    this.logoutUser().subscribe(response=>{
      const user=this.tokenService.getUser();
      this.tokenService.logout();
      this.websocketService.disconnectWebSocket(user.id)
      window.location.href = 'https://localhost:4200/home';
    })
  }

  private setupAutoLogout(): void {
    if (this.tokenService.isTokenExpired()) {
      this.logoutUserNow();
    
    } else {
      const expirationTime = this.tokenService.getTokenExpiration();
      console.log(expirationTime);
      const safeExpirationTime = expirationTime ?? new Date().getTime() + 3600000;
      const timeLeft = safeExpirationTime - new Date().getTime();
  
      if (timeLeft > 0) {
        this.logoutTimer = setTimeout(() => {
          this.tokenService.logout();
        }, timeLeft);
      }
    }
  }
  

  private resetTimer(): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.setupAutoLogout();
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keypress', ['$event'])
  onUserActivity(): void {
    this.resetTimer();
  }


}

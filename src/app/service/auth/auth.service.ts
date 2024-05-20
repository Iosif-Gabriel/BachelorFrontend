import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService: TokenService) { }

  createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}

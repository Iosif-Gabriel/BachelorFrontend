import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/dtos/AuthenticationRequest';
import { AuthenticationResponse } from 'src/app/dtos/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  
  
  constructor(private http: HttpClient,private router: Router) { }

  private baseURL="http://localhost:8080/api/auth/authenticate";
  
  login(authReq:AuthenticationRequest):Observable<AuthenticationResponse>{
  
    return this.http.post<AuthenticationResponse>(this.baseURL,authReq);
  }
}

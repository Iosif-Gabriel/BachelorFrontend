import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/dtos/RegisterRequest';
import { Observable } from 'rxjs';
import { RegisterResponse } from 'src/app/dtos/RegisterResponse';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,private router: Router) { }

  private baseURL="https://localhost:8080/api/auth/register";
  
  register(registerReq:RegisterRequest):Observable<RegisterResponse>{
   
    return this.http.post<RegisterResponse>(this.baseURL,registerReq);
  }
}

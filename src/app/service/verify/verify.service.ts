import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthenticationRequest } from 'src/app/dtos/AuthenticationRequest';
import { AuthenticationResponse } from 'src/app/dtos/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {


  private triggerFunctionSubject = new Subject<void>();
   
  constructor(private httpClient: HttpClient) { }
 
  triggerFunction$ = this.triggerFunctionSubject.asObservable();

  triggerFunction() {
    this.triggerFunctionSubject.next();
  }


  verifyCode(verificationToken: String):Observable<AuthenticationResponse>{
    const verifyURL=`https://localhost:8080/api/auth/verify/${verificationToken}`

    return this.httpClient.post<AuthenticationResponse>(verifyURL,null);
  }

  sendCode(jwtToken: String):Observable<AuthenticationResponse>{
    const verifyURL=`https://localhost:8080/api/auth/sendCodeAgain/${jwtToken}`

    return this.httpClient.post<AuthenticationResponse>(verifyURL,null);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { AuthenticationResponse } from 'src/app/dtos/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userByToken='http://localhost:8080/user/getByToken'
  private verifyTokenURL='http://localhost:8080/api/auth/verify'
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  getByToken():Observable<UserDTO>{
    let jwt=this.tokenService.getToken();
    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    const requestOptions = { headers: headers };
    return this.httpClient.get<UserDTO>(this.userByToken, requestOptions);
  }

  verifyToken(verif:String):Observable<AuthenticationResponse>{
    return this.httpClient.post<AuthenticationResponse>(`${this.verifyTokenURL}/${verif}`, null);
  }
}

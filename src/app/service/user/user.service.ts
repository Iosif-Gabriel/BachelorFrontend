import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { AuthenticationResponse } from 'src/app/dtos/AuthenticationResponse';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userByToken='https://localhost:8080/user/getByToken'
 
  constructor(private httpClient: HttpClient, private tokenService: TokenService,private authService:AuthService) { }

  getByToken():Observable<UserDTO>{
    let jwt=this.tokenService.getToken();
    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    })
    const requestOptions = { headers: headers };
    return this.httpClient.get<UserDTO>(this.userByToken, requestOptions);
  }

  getAllUsers():Observable<UserDTO[]>{
    const headers = this.authService.createAuthHeaders();
    const userURL=`https://localhost:8080/user/getAllUsers`;

    return this.httpClient.get<UserDTO[]>(userURL,{headers});

  }

  getUserMonthlyStats():Observable<any[]>{
    const headers = this.authService.createAuthHeaders();
    const userURL=`https://localhost:8080/user/getUserMonthlyStats`;

    return this.httpClient.get<any[]>(userURL,{headers});
  }


}

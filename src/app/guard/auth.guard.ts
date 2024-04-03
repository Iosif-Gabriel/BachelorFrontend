import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private tokenService: TokenService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getUser().role == "ADMIN") {
      return true;
    } else {
      console.log("user");
      //this.router.navigate(['/userHome']);
      return false;
    }
  }
  
}

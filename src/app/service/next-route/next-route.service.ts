import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PopupService } from '../popup/popup.service';

@Injectable({
  providedIn: 'root'
})
export class NextRouteService {
  private nextRoute: string = '';

  // constructor(private router: Router,private popupService:PopupService) {
  //   this.router.events.pipe(
  //     filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
      
  //     console.log('Următoarea rută:', event.urlAfterRedirects);
  //     if(event.urlAfterRedirects==='/userCreatedEvents' || event.urlAfterRedirects==='/userFavEvents' || event.urlAfterRedirects==='/userOrders' || event.urlAfterRedirects==='/userFeedback'){

  //       this.popupService.setisEventPageOpen(true);

  //     }else if(event.urlAfterRedirects==='/userHome'){

  //       this.popupService.setisEventPageOpen(false);
  //     }
  //   });
  // }

  getNextRoute(): string {
    
    return this.nextRoute;
  }
}

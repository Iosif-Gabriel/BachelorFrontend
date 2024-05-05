import { Component, HostListener, OnInit } from '@angular/core';

import { PopupService } from '../service/popup/popup.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  
  createPop:boolean=false;
  userOrgEvents:boolean=false;

  constructor(private popupService:PopupService){}

  ngOnInit(): void {


   this.popupService.isCreatEventOpen.subscribe(create=>{
    this.createPop=create;
    
   })

    this.popupService.isUserOrgEventsOpen.subscribe(org=>{
      this.userOrgEvents=org;
      if(this.userOrgEvents==true){
        this.popupService.setisEventPageOpen(true);
      }
     
    })
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const navBar = document.querySelector('.navBar') as HTMLElement; // selectează bara de navigare
    if (window.scrollY > 100) { // Schimbă 100 cu poziția la care vrei să apară animația
        navBar.classList.add('hidden');
    } else {
        navBar.classList.remove('hidden');
    }
  }
}

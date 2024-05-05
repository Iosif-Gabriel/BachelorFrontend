import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { EventService } from '../service/event/event.service';
import { PopupService } from '../service/popup/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  dropdownOpen: boolean = false;
  createPop:boolean=false;
  isOnEventPage:boolean=false;

  constructor(private router:Router,private renderer: Renderer2, private elementRef: ElementRef,private popupService:PopupService) {}

  ngOnInit(): void {
    this.popupService.isEventPageOpen.subscribe(isEventOpen=>{
      this.isOnEventPage=isEventOpen;
      console.log(this.isOnEventPage)
      if(this.isOnEventPage==true){
        const navbar=document.getElementById('navbarFilter');
        if (navbar) {
          navbar.style.height = '80px'; // sau '80rem' în funcție de unitatea dorită
        }
      }
    
    })
  }

  openOptions(){
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Verifică dacă elementul pe care s-a făcut clic nu este în interiorul dropdown-ului
    if (!this.elementRef.nativeElement.contains(event.target)) {
     
      this.dropdownOpen = false;
    }
  }

  createEvent(){
    this.createPop=true;
    this.popupService.setCreatEventOpen(this.createPop);
  }

  
  openUserEvents(){
    this.popupService.setisUserOrgEventsOpen(true);
  }

  openUserFav(){
    
  }

  openUserOrders(){

  }

  openSettings(){

  }

  logoutUser(){

  }

  go2UserPage(){
    this.router.navigate(['/userHome']); 
  }

}

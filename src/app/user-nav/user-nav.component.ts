import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { EventService } from '../service/event/event.service';
import { PopupService } from '../service/popup/popup.service';
import { Router } from '@angular/router';
import { SectionService } from '../service/section/section.service';
import { SearchService } from '../service/seach/seach.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  dropdownOpen: boolean = false;
  createPop:boolean=false;
  isOnEventPage:boolean=false;
  searchTerm: string = '';
  filterTerm?:string ='';

  constructor(private searchService:SearchService,private sectionService: SectionService,private router:Router,private renderer: Renderer2, private elementRef: ElementRef,private popupService:PopupService) {}


  searchEvents(){
    this.searchService.setSearchTerm(this.searchTerm)
  }

  openOptions(){
    this.dropdownOpen = !this.dropdownOpen;
  }

  
  ngOnInit(): void {
    this.popupService.isEventPageOpen.subscribe((isOpen: boolean) => {
      if(isOpen==true){
        this.changeSizeNav('small');
      }else{
        this.changeSizeNav('normal');
      }
     
  });
  }

  changeSizeNav(size:string){
    const navbar=document.getElementById('navbarFilter');
    const userF=document.getElementById('userfunctions');
    if(size==='normal'){
      if (navbar) {
        navbar.style.height = '130px';
        if(userF){
          userF.style.marginTop='10px';
     
        }
        this.isOnEventPage=false;
      }
    }else{
      if (navbar) {
        navbar.style.height = '70px'; 
        if(userF){
          userF.style.marginTop='0px';
        
        }
        
        this.isOnEventPage=true;
      }
    }
    
  }

  handleItemClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const span = target.querySelector('.link-text');
    if (span) {

      this.filterTerm=span.textContent as string;
      this.searchService.setFilterTerm(this.filterTerm)
      console.log(span.textContent);
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
     
      this.dropdownOpen = false;
    }
  }

  createEvent(){
    this.createPop=true;
    this.popupService.setCreatEventOpen(this.createPop);
    this.sectionService.setActiveActivity('createActivity');
  }

  
  openUserEvents(){
    this.router.navigate(['/userHome']);
    this.sectionService.setActiveSection("userOrgEvents");
    this.changeSizeNav('small');
  }

  openUserFav(){
    this.sectionService.setActiveSection("userFavEvents");
    this.changeSizeNav('small');
  }

  openUserOrders(){
    this.sectionService.setActiveSection("userOrdes");
    this.changeSizeNav('small');
  }

  openSettings(){
    this.sectionService.setActiveSection("settings");
  }

  logoutUser(){
    this.router.navigate(['/home'])
    sessionStorage.clear();
  }

  go2UserPage(){
    this.router.navigate(['/userHome']);
    this.sectionService.setActiveSection("allEvents");
    this.changeSizeNav('normal');
  }

}

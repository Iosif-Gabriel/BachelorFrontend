import { Component, ElementRef, HostListener, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { EventService } from '../service/event/event.service';
import { PopupService } from '../service/popup/popup.service';
import { Router } from '@angular/router';
import { SectionService } from '../service/section/section.service';
import { SearchService } from '../service/seach/seach.service';
import { LogoutService } from '../service/logout/logout.service';
import { WebSocketService } from '../service/websocket/web-socket.service';
import { TokenService } from '../service/token/token.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  @ViewChild('popupContent', { read: TemplateRef }) popupContent!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  dropdownOpen: boolean = false;
  createPop:boolean=false;
  isOnEventPage:boolean=false;
  searchTerm: string = '';
  filterTerm?:string ='';
  open:boolean=false;


  openNotif:boolean=false;

  constructor(private viewContainerRef: ViewContainerRef,private tokenService: TokenService,private websocketService:WebSocketService,private logoutService:LogoutService,private searchService:SearchService,private sectionService: SectionService,private router:Router,private renderer: Renderer2, private elementRef: ElementRef,private popupService:PopupService) {
    this.popupService.closeNotification.subscribe(() => {
      
     this.togglePopup();
    });

    
  }

  ngOnInit(): void {
    
    this.popupService.isEventPageOpen.subscribe((isOpen: boolean) => {
      console.log('isOpen:', isOpen);
      this.open = isOpen;
      this.updateNavbarSize(); 
    });
  }
  
  
  private updateNavbarSize(): void {
    const navbar = document.getElementById('navbarFilter');
    const userF = document.getElementById('userfunctions');
  
    if (this.open === true) {
     
      if (navbar) {
        navbar.style.height = '70px';
      }
      if (userF) {
        userF.style.marginTop = '0px';
      }
      this.isOnEventPage = true;
    } else {
     
      if (navbar) {
        navbar.style.height = '130px';
      }
      if (userF) {
        userF.style.marginTop = '10px';
      }
      this.isOnEventPage = false;
    }
  }


  logoutUser(){
    
    this.logoutService.logoutUser().subscribe( {
      next: any => {
        const user=this.tokenService.getUser();
        this.tokenService.logout();
        this.websocketService.disconnectWebSocket(user.id)
        window.location.href = 'https://localhost:4200/home';
      }
    });
  }

  searchEvents(){
   
    this.searchService.setSearchTerm(this.searchTerm)
    

  }

  openOptions(){
    this.dropdownOpen = !this.dropdownOpen;
  }

  

  handleItemClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const span = target.querySelector('.link-text');
    if (span) {

      this.filterTerm=span.textContent as string;
      this.searchService.setFilterTerm(this.filterTerm)
     
     
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
     
      this.dropdownOpen = false;
    }
  }

  
  openNotifications(){
    this.openNotif = !this.openNotif;
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.popupContent);
    this.sectionService.setActiveActivity('');
  }

  togglePopup(): void {
    this.openNotif = !this.openNotif;
    this.viewContainerRef.clear();
  }


  createEvent(){
    this.createPop=true;
    this.popupService.setCreatEventOpen(this.createPop);
    this.sectionService.setActiveActivity('createActivity');
  }

  
  openUserEvents(){
    this.searchService.setSearchTerm("")
    this.router.navigate(['/userCreatedEvents'])
  }

  openUserFav(){
   
    this.searchService.setSearchTerm("")
    this.router.navigate(['/userFavEvents'])
    
  }

  openUserOrders(){
 
   this.router.navigate(['/userOrders'])
   
  }

  openUserReviews(){
    this.router.navigate(['/userFeedback']);
  }

  openSettings(){
    this.sectionService.setActiveSection("settings");
  }

  go2UserPage(){

    this.sectionService.setActiveSection("allEvents");
    this.router.navigate(['/userHome']);
    this.searchService.setFilterTerm("All")
    this.searchService.setSearchTerm("")
    this.searchTerm=''
    this.open=false;
  }

}

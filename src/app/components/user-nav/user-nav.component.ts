import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { EventService } from '../../service/event/event.service';
import { PopupService } from '../../service/popup/popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from '../../service/section/section.service';
import { SearchService } from '../../service/seach/seach.service';
import { LogoutService } from '../../service/logout/logout.service';
import { WebSocketService } from '../../service/websocket/web-socket.service';
import { TokenService } from '../../service/token/token.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit,AfterViewInit {

  @ViewChild('popupContent', { read: TemplateRef }) popupContent!: TemplateRef<any>;
  @ViewChild('AllFilter') specificNavItem!: ElementRef;
  dialogRef!: MatDialogRef<any>;
  dropdownOpen: boolean = false;
  createPop:boolean=false;
  isOnEventPage:boolean=false;
  searchTerm: string = '';
  filterTerm?:string ='All';
  open:boolean=false;
  userName:any='';
  user:any;


  openNotif:boolean=false;

  constructor(private route: ActivatedRoute,private viewContainerRef: ViewContainerRef,private tokenService: TokenService,private logoutService:LogoutService,private searchService:SearchService,private sectionService: SectionService,private router:Router,private renderer: Renderer2, private elementRef: ElementRef,private popupService:PopupService) {
    this.popupService.closeNotification.subscribe(() => {
      
     this.togglePopup();
    });

  }

  ngAfterViewInit(): void {
    if (this.specificNavItem) {
      const navItem = this.specificNavItem.nativeElement;
 
      this.renderer.addClass(navItem,"active-nav-link");

    } else {
      console.log('Element not found!');
    }    
  }

  activeItem: string = '';

  setActiveItem(item: string) {
    console.log(item);
    this.activeItem = item;
  }

  ngOnInit(): void {
    
    this.popupService.isEventPageOpen.subscribe((isOpen: boolean) => {
      console.log('isOpen:', isOpen);
      this.open = isOpen;
      this.updateNavbarSize(); 
    });

    this.user=this.tokenService.getUser();
    this.userName=this.user.firstName;

  }

  checkActiveSection(active:string){
    const activeSection=this.sectionService.getActiveSection();

    return activeSection==active;
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
    
    this.logoutService.logoutUserNow();
  }

  searchEvents(){
    this.searchService.setSearchTerm(this.searchTerm)
  }

  openOptions(){
    this.dropdownOpen = !this.dropdownOpen;
  }


  handleItemClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const allNavLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLElement>;
    allNavLinks.forEach(link => link.classList.remove('active-nav-link'));

    target.classList.add('active-nav-link');

    const span = target.querySelector('.link-text') as HTMLElement;
    if (span) {
      this.filterTerm = span.textContent?.trim() as string;
      this.searchService.setFilterTerm(this.filterTerm);
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

  openUserProfile(){
    
    this.router.navigate(['/userProfile', this.user.id, this.user.firstName]);
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
    this.setActiveItem('favourites')
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

  go2UserPage() {
    this.sectionService.setActiveSection("allEvents");
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    
    this.router.navigate(['/userHome']).then(() => {
      
      this.searchService.setFilterTerm("All");
      this.searchService.setSearchTerm("");
      this.searchTerm = '';
      this.open = false;
    });
  }

}

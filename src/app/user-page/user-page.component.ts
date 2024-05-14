import { Component, HostListener, OnInit } from '@angular/core';

import { PopupService } from '../service/popup/popup.service';
import { SectionService } from '../service/section/section.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  
  createPop:boolean=false;
  userOrgEvents:boolean=false;
  orderOpen:boolean=false;

  constructor(private sectionService: SectionService,private popupService:PopupService) {}

  ngOnInit(): void {
    this.popupService.isCreatEventOpen.subscribe(create=>{
      this.createPop=create;
    })
  }


  isActiveSection(section: string): boolean {
    return this.sectionService.getActiveSection() === section;
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

  getEventMessage(): string {
    return this.sectionService.getEventMessage();
  }

  getMyEventsMessage():string{
    return this.sectionService.getMyEventsMessage();
  }

  getMyOrdersMessage():string{
    return this.sectionService.getOrdersMessage();
  }

  getSeachMessage():boolean{
    return this.sectionService.getEventsFound();
  }

  getFavMessage():string{
    return this.sectionService.getFavEvents();
  }
}

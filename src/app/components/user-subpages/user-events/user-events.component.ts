import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventWithPicturesDTO } from 'src/app/dtos/EventWithPicturesDTO';
import { EventService } from 'src/app/service/event/event.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SectionService } from 'src/app/service/section/section.service';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit,OnDestroy {

  userOrgEvents:EventWithPicturesDTO[]=[];
  createPop:boolean=false;
  
  constructor(private tokenService:TokenService,private eventService:EventService,private sectionService: SectionService,private popupService:PopupService){
 
  }
   
  ngOnInit(): void {
    this.sectionService.setActiveSection("userOrgEvents");
    const user = this.tokenService.getUser();
    this.eventService.getOrganizerEvents(user.id).subscribe(list => {
   
      this.userOrgEvents=list; 
      this.popupService.setisEventPageOpen(true);
      
    

    });
    this.popupService.isCreatEventOpen.subscribe(create => {
      this.createPop = create;
      
    });

  }

  ngOnDestroy(): void {
    // this.popupService.setisEventPageOpen(false);
  }

  isActiveSection(section: string): boolean {
    return this.sectionService.getActiveSection() === section;
  }

  isActiveActivity(activity:string):boolean{
    console.log(activity);
    return this.sectionService.getActiveActivity()==activity;
  }


}

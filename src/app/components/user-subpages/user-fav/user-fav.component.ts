import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EventWithPicturesDTO } from 'src/app/dtos/EventWithPicturesDTO';
import { EventService } from 'src/app/service/event/event.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SectionService } from 'src/app/service/section/section.service';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-user-fav',
  templateUrl: './user-fav.component.html',
  styleUrls: ['./user-fav.component.css']
})
export class UserFavComponent implements OnInit,OnDestroy,OnChanges {

  userFavEvents:EventWithPicturesDTO[]=[];

  constructor(private tokenService:TokenService,private eventService:EventService,private sectionService:SectionService,private popupService:PopupService){}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    // this.popupService.setisEventPageOpen(false);
  }
  ngOnInit(): void {
    const userId=this.tokenService.getUser().id;
    this.sectionService.setActiveSection("userFavEvents")
    this.eventService.getUserFavEvents(userId).subscribe(userFav=>{
      this.userFavEvents=userFav;
    
      console.log(this.userFavEvents)
    
      this.popupService.setisEventPageOpen(true);
    })
 
  }

  isActiveSection(section: string): boolean {
    return this.sectionService.getActiveSection() === section;
  }

  isActiveActivity(activity:string):boolean{

    return this.sectionService.getActiveActivity()==activity;
  }
}

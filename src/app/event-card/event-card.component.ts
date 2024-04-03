import { Component, Input, ViewEncapsulation } from '@angular/core';
import { EventDTO } from '../dtos/EventDTO';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventCardComponent {
  @Input() event: EventDTO | undefined;

  fav:boolean=false;
  addToFav():void{

    if(this.fav==true){
      this.fav=false;
    }else{
      this.fav=true;
    }
    
  }
}

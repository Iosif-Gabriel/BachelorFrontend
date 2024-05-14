import { Injectable } from '@angular/core';
import { EventWithPicturesDTO } from 'src/app/dtos/EventWithPicturesDTO';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private activeSection: string = 'allEvents';
  private activeActivity: string ='';
  events: any[] = [];
  myEvents: any[] = [];
  orders: any[] = [];
  fav:any[]=[];
  noEventsFound:boolean=false;

  constructor() {}

  setActiveActivity(activity:string){
    this.activeActivity=activity;
  }

  getActiveActivity(){
    return this.activeActivity; 
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  getActiveSection(): string {
    return this.activeSection;
  }

  setEvents(events: any[]): void {
    this.events = events;
  }

  setMyEvents(myEvents: any[]): void {
    this.myEvents = myEvents;
  }

  setOrders(orders: any[]): void {
    this.orders = orders;
  }

  setFavEvents(fav:any[]):void{
    this.fav=fav;
  }

  setEventsFound(eventsFound:boolean){
    this.noEventsFound=eventsFound;
  }

  getEventsFound(): boolean {
    return this.noEventsFound;
  }
  
  getEventMessage(): string {
    return this.events.length > 0 ? '' : 'No events available...';
  }

  getMyEventsMessage(): string {
    return this.myEvents.length > 0 ? '' : 'You have no events...';
  }

  getOrdersMessage(): string {
    return this.orders.length > 0 ? '' : 'You have no orders...';
  }

  getFavEvents():string{
    return this.fav.length > 0 ? '' : 'You have no favourite events...'
  }
}

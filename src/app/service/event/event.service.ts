import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDTO } from 'src/app/dtos/EventDTO';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  private getAllEventsURL="http://localhost:8080/event/getAllEvents";
  constructor(private http:HttpClient) { }

  getAllEvents():Observable<EventDTO[]>{

    return this.http.get<EventDTO[]>(this.getAllEventsURL);
  }
}

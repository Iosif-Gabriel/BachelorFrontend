import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { EventDTO } from 'src/app/dtos/EventDTO';
import { EventWithPicturesDTO } from 'src/app/dtos/EventWithPicturesDTO';
import { EventTypeDTO } from 'src/app/dtos/EventTypeDTO';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventDTO!: EventDTO;
  private eventWithPicturesDTO!:EventWithPicturesDTO;
  createEventPop!:boolean;
  private getAllEventTypesURL="http://localhost:8080/eventType/getAllEventTypes"
  private createEventURL="http://localhost:8080/event/createEvent";
  private getCoverPhotosURL="http://localhost:8080/event/getAllEventsWithPictures";


  constructor(private http:HttpClient) { }

  setEventDTO(eventDTO: EventDTO): void {
    this.eventDTO = eventDTO;
  }

  getEventDTO(): EventDTO  {
    return this.eventDTO;
  }

  setEventWithPictures(event:EventWithPicturesDTO){
    this.eventWithPicturesDTO=event;
  }

  getEventWithPictures():EventWithPicturesDTO{
    return this.eventWithPicturesDTO;
  }

  getCoverPhotos():Observable<EventWithPicturesDTO[]>{

    return this.http.get<EventWithPicturesDTO[]>(this.getCoverPhotosURL);
  }

  getAllEventTypes():Observable<EventTypeDTO[]>{
    return this.http.get<EventTypeDTO[]>(this.getAllEventTypesURL);
  }

  createEvent(eventDTO: EventDTO): Observable<EventDTO> {

  
    return this.http.post<EventDTO>(this.createEventURL, eventDTO);
  }

  uploadImages(eventDTO: EventDTO, images: { path: string, file: File }[]): Observable<any> {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image.file);
    });
    console.log(eventDTO);
    return this.createEvent(eventDTO).pipe(
      switchMap((response) => {
        const uploadImagesEventURL = `http://localhost:8080/eventImages/uploadImagesForEvent/${response}`;
        return this.http.post<any>(uploadImagesEventURL, formData);
      })
    );
  }

  getEventById(eventId:string): Observable<EventWithPicturesDTO> {
    const getEventWithGallery=`http://localhost:8080/event/getEventByIdWithGallery/${eventId}`;
    
    return this.http.get<EventWithPicturesDTO>(getEventWithGallery)
  }

  getOrganizerEvents(organizerId:string):Observable<EventWithPicturesDTO[]>{
    const getOrgEvents= `http://localhost:8080/event/getOrganizerEvents/${organizerId}`

    return this.http.get<EventWithPicturesDTO[]>(getOrgEvents);
  }

  getEventsByEventType(eventType:string):Observable<EventWithPicturesDTO[]>{
    const getfiltereEvents=`http://localhost:8080/event/getEventsByType/${eventType}`
    return this.http.get<EventWithPicturesDTO[]>(getfiltereEvents);
  }
  
  addEventToFav(eventId:string,userId:string){
    const addFavEventURL=`http://localhost:8080/favEvent/addToFav?eventId=${eventId}&userId=${userId}`

    return this.http.post(addFavEventURL,null);
  }

  getUserFavEvents(userId:string):Observable<EventWithPicturesDTO[]>{
    const getUserFavEventsURL=`http://localhost:8080/favEvent/getUserFav?&userId=${userId}`
    
    return this.http.get<EventWithPicturesDTO[]>(getUserFavEventsURL);

  }

  

  
}

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
  createEventPop!:boolean;
  private getAllEventsURL="http://localhost:8080/event/getAllEvents";
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

  getAllEvents():Observable<EventDTO[]>{

    return this.http.get<EventDTO[]>(this.getAllEventsURL);
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
  

  

  
}

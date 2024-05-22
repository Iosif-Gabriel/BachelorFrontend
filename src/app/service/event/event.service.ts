import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { EventDTO } from 'src/app/dtos/EventDTO';
import { EventWithPicturesDTO } from 'src/app/dtos/EventWithPicturesDTO';
import { EventTypeDTO } from 'src/app/dtos/EventTypeDTO';
import { TokenService } from '../token/token.service';
import { AuthService } from '../auth/auth.service';
import { LogoutService } from '../logout/logout.service';
import { WebSocketService } from '../websocket/web-socket.service';

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


  constructor(private tokenService:TokenService,private websocketService:WebSocketService,private logoutService:LogoutService,private auth:AuthService,private http:HttpClient) { }


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

  getCoverPhotos(): Observable<EventWithPicturesDTO[]> {
    const headers = this.auth.createAuthHeaders();
  
    return this.http.get<EventWithPicturesDTO[]>(this.getCoverPhotosURL, { headers })
      .pipe(
        catchError(error => {
          if (error.status === 403 && error.url === 'http://localhost:8080/event/getAllEventsWithPictures') {
            console.error("403 error on specific endpoint. Logging out.");
            this.logoutService.logoutUser().subscribe( {
              next: any => {
                const user=this.tokenService.getUser();
                this.tokenService.logout();
                this.websocketService.disconnectWebSocket(user.id)
                window.location.href = 'http://localhost:4200/home';
              }
            });
          }
          return throwError(error); // Re-throw other errors
        })
      );
  }
  

  getAllEventTypes():Observable<EventTypeDTO[]>{
    const headers = this.auth.createAuthHeaders();
    return this.http.get<EventTypeDTO[]>(this.getAllEventTypesURL,{headers});
  }

  createEvent(eventDTO: EventDTO): Observable<EventDTO> {
    const headers = this.auth.createAuthHeaders();
  
    return this.http.post<EventDTO>(this.createEventURL, eventDTO,{headers});
  }

  uploadImages(eventDTO: EventDTO, images: { path: string, file: File }[]): Observable<any> {
    const headers = this.auth.createAuthHeaders();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image.file);
    });
    console.log(eventDTO);
    return this.createEvent(eventDTO).pipe(
      switchMap((response) => {
        const uploadImagesEventURL = `http://localhost:8080/eventImages/uploadImagesForEvent/${response}`;
        return this.http.post<any>(uploadImagesEventURL, formData,{headers});
      })
    );
  }

  getEventById(eventId:string): Observable<EventWithPicturesDTO> {
    const headers = this.auth.createAuthHeaders();
   
    const getEventWithGalleryURL=`http://localhost:8080/event/getEventByIdWithGallery/${eventId}`;

    
    return this.http.get<EventWithPicturesDTO>(getEventWithGalleryURL,{headers})
  }

  getOrganizerEvents(organizerId:string):Observable<EventWithPicturesDTO[]>{
    const headers = this.auth.createAuthHeaders();
    const getOrgEvents= `http://localhost:8080/event/getOrganizerEvents/${organizerId}`

    return this.http.get<EventWithPicturesDTO[]>(getOrgEvents,{headers});
  }

  getEventsByEventType(eventType:string):Observable<EventWithPicturesDTO[]>{
    const headers = this.auth.createAuthHeaders();
    const getfiltereEvents=`http://localhost:8080/event/getEventsByType/${eventType}`
    return this.http.get<EventWithPicturesDTO[]>(getfiltereEvents,{headers});
  }
  
  addEventToFav(eventId:string,userId:string){
    const headers = this.auth.createAuthHeaders();
    const addFavEventURL=`http://localhost:8080/favEvent/addToFav?eventId=${eventId}&userId=${userId}`

    return this.http.post(addFavEventURL,null,{headers});
  }

  getUserFavEvents(userId:string):Observable<EventWithPicturesDTO[]>{
    const headers = this.auth.createAuthHeaders();
    const getUserFavEventsURL=`http://localhost:8080/favEvent/getUserFav?&userId=${userId}`
    
    return this.http.get<EventWithPicturesDTO[]>(getUserFavEventsURL,{headers});

  }

  

  
}

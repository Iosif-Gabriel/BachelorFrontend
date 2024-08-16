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
  private eventId!:string;
  private getAllEventTypesURL="https://localhost:8080/eventType/getAllEventTypes"
  private createEventURL="https://localhost:8080/event/createEvent";
  private getCoverPhotosURL="https://localhost:8080/event/getAllEventsWithPictures";


  constructor(private tokenService:TokenService,private websocketService:WebSocketService,private logoutService:LogoutService,private auth:AuthService,private http:HttpClient) { }

  setEventId(eventId:string):void{
    this.eventId=eventId;
  }

  getEventId():string{
    return this.eventId;
  }

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

  getAllEvents(): Observable<EventDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getAllEventsURL = `https://localhost:8080/event/getAllEvents`;
    
    return this.http.get<EventDTO[]>(getAllEventsURL,{headers});
  }

  getCoverPhotos(): Observable<EventWithPicturesDTO[]> {
    const headers = this.auth.createAuthHeaders();
  
    return this.http.get<EventWithPicturesDTO[]>(this.getCoverPhotosURL, { headers })
      .pipe(
        catchError(error => {
          if (error.status === 403 && error.url === 'https://localhost:8080/event/getAllEventsWithPictures') {
            console.error("403 error on specific endpoint. Logging out.");
            // this.logoutService.logoutUser().subscribe( {
            //   next: any => {
            //     const user=this.tokenService.getUser();
            //     this.tokenService.logout();
            //     this.websocketService.disconnectWebSocket(user.id)
            //     window.location.href = 'https://localhost:4200/home';
            //   }
            // });
          }
          return throwError(error); 
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

    return this.createEvent(eventDTO).pipe(
      catchError((error) => {
        
        return throwError(error);
      }),
      switchMap((eventId) => {
       
        const uploadImagesEventURL = `https://localhost:8080/eventImages/uploadImagesForEvent/${eventId}`;
        
        return this.http.post<any>(uploadImagesEventURL, formData, { headers }).pipe(
          catchError((error) => {

            return throwError(error);
          })
        );
      })
    );
  }

  getEventById(eventId:string): Observable<EventWithPicturesDTO> {
    const headers = this.auth.createAuthHeaders();
   
    const getEventWithGalleryURL=`https://localhost:8080/event/getEventByIdWithGallery/${eventId}`;

    
    return this.http.get<EventWithPicturesDTO>(getEventWithGalleryURL,{headers})
  }

  getOrganizerEvents(organizerId:string):Observable<EventWithPicturesDTO[]>{
    const headers = this.auth.createAuthHeaders();
    const getOrgEvents= `https://localhost:8080/event/getOrganizerEvents/${organizerId}`

    return this.http.get<EventWithPicturesDTO[]>(getOrgEvents,{headers});
  }

  getEventsByEventType(eventType:string):Observable<EventWithPicturesDTO[]>{
    const headers = this.auth.createAuthHeaders();
    const getfiltereEvents=`https://localhost:8080/event/getEventsByType/${eventType}`
    return this.http.get<EventWithPicturesDTO[]>(getfiltereEvents,{headers});
  }
  
  addEventToFav(eventId:string,userId:string){
    const headers = this.auth.createAuthHeaders();
    const addFavEventURL=`https://localhost:8080/favEvent/addToFav?eventId=${eventId}&userId=${userId}`

    return this.http.post(addFavEventURL,null,{headers});
  }

  getUserFavEvents(userId:string):Observable<EventWithPicturesDTO[]>{
    const headers = this.auth.createAuthHeaders();
    const getUserFavEventsURL=`https://localhost:8080/favEvent/getUserFav?&userId=${userId}`
    
    return this.http.get<EventWithPicturesDTO[]>(getUserFavEventsURL,{headers});

  }

  checkFavEvent(eventId:string,userId:string):Observable<any>{
    const headers = this.auth.createAuthHeaders();
    const checkFavEventURL=`https://localhost:8080/favEvent/checkIfFav?eventId=${eventId}&userId=${userId}`

    return this.http.get<any>(checkFavEventURL,{headers});
  }
 
  deleteEvent(eventId: string): Observable<any> {
    const headers = this.auth.createAuthHeaders();
    const deleteEventURL = `https://localhost:8080/event/deleteEvent/${eventId}`;

    return this.http.delete(deleteEventURL, { headers }).pipe(
      catchError(error => {
      
        console.error('An error occurred:', error);
        return throwError('Something went wrong while deleting the event.');
      })
    );
  }

  patchEvent(eventDTO:EventDTO,images: { path: string, file: File }[]):Observable<any>{
    const headers = this.auth.createAuthHeaders();
    const patchEventURL = `https://localhost:8080/event/patchEvent/${eventDTO.id}`;
    console.log(images);
    if(images.length!==0){
      const patchImagesEventURL = `https://localhost:8080/eventImages/updateEventPictures/${eventDTO.id}`;
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("files", image.file);
      });
      return this.http.patch(patchImagesEventURL,formData,{headers,responseType: 'text' });
    }
    

    return this.http.patch(patchEventURL,eventDTO,{headers,responseType: 'text' });
  }


  getEventPictures(eventId:string):Observable<any>{
    const headers = this.auth.createAuthHeaders();
    const getEventPicturesURL = `https://localhost:8080/eventImages/getPicturesForEvent/${eventId}`;

    return this.http.get(getEventPicturesURL,{headers});
  }
    

  
}

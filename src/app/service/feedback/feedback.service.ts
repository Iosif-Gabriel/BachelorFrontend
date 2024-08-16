import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Observable, catchError, throwError } from 'rxjs';
import { FeedbackDTO } from 'src/app/dtos/FeedbackDTO';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

 
  private editFeedback!:FeedbackDTO;
  constructor(private auth:AuthService,private http:HttpClient) { }

  setFeedback(feedback:FeedbackDTO){
    this.editFeedback=feedback;
  }

  getFeedback():FeedbackDTO{
    return this.editFeedback;
  }

  getAllFeedback():Observable<FeedbackDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getAllFeedbackURL='https://localhost:8080/feedback/getAllFeedback'

    return this.http.get<FeedbackDTO[]>(getAllFeedbackURL,{headers});
  }


  createFeedback(feedback:FeedbackDTO):Observable<FeedbackDTO>{
    const headers=this.auth.createAuthHeaders();
    const createFeedbackURL='https://localhost:8080/feedback/addFeedback'

    return this.http.post<FeedbackDTO>(createFeedbackURL,feedback,{headers});
  }

  getEventFeedback(eventId:string):Observable<FeedbackDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getEventFeedbackURL=`https://localhost:8080/feedback/getEventFeedback/${eventId}`

    return this.http.get<FeedbackDTO[]>(getEventFeedbackURL,{headers});
  }

  getUserFeedback(userId:string):Observable<FeedbackDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getUserFeedbackURL=`https://localhost:8080/feedback/getUserFeedback/${userId}`

    return this.http.get<FeedbackDTO[]>(getUserFeedbackURL,{headers});
  }

  deleteUserFeedback(feedbackId:string):Observable<any>{
    const headers=this.auth.createAuthHeaders();
    const deleteFeedbackURL=`https://localhost:8080/feedback/deleteUserFeedback/${feedbackId}`

    return this.http.delete(deleteFeedbackURL, { headers }).pipe(
      catchError(error => {
       
        console.error('An error occurred:', error);
        return throwError('Something went wrong while deleting the event.');
      })
    );
  }

  patchFeedback(feedback:FeedbackDTO){
    const headers=this.auth.createAuthHeaders();
    const patchFeedbackURL=`https://localhost:8080/feedback/patchUserFeedback/${feedback.id}`

    return this.http.patch(patchFeedbackURL,feedback,{headers,responseType: 'text' });
  }

}

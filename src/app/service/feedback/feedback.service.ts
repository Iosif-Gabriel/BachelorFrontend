import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Observable, catchError, throwError } from 'rxjs';
import { FeedbackDTO } from 'src/app/dtos/FeedbackDTO';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

 

  constructor(private auth:AuthService,private http:HttpClient) { }


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
}

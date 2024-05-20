import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Observable } from 'rxjs';
import { FeedbackDTO } from 'src/app/dtos/FeedbackDTO';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

 

  constructor(private auth:AuthService,private http:HttpClient) { }


  createFeedback(feedback:FeedbackDTO):Observable<FeedbackDTO>{
    const headers=this.auth.createAuthHeaders();
    const createFeedbackURL='http://localhost:8080/feedback/addFeedback'

    return this.http.post<FeedbackDTO>(createFeedbackURL,feedback,{headers});
  }

  getEventFeedback(eventId:string):Observable<FeedbackDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getEventFeedbackURL=`http://localhost:8080/feedback/getEventFeedback/${eventId}`

    return this.http.get<FeedbackDTO[]>(getEventFeedbackURL,{headers});
  }

  getUserFeedback(userId:string):Observable<FeedbackDTO[]>{
    const headers=this.auth.createAuthHeaders();
    const getUserFeedbackURL=`http://localhost:8080/feedback/getUserFeedback/${userId}`

    return this.http.get<FeedbackDTO[]>(getUserFeedbackURL,{headers});
  }
}

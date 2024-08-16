import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { OrderDTO } from 'src/app/dtos/OrderDTO';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private authService:AuthService){}

  getAllOrders():Observable<OrderDTO[]>{
    const headers = this.authService.createAuthHeaders();
    const orderURL=`https://localhost:8080/order/getAllOrders`;

    return this.http.get<OrderDTO[]>(orderURL,{headers});

  }

  getUserOrders(idUser:string):Observable<OrderDTO[]>{
    const headers = this.authService.createAuthHeaders();
    const orderURL=`https://localhost:8080/order/getUsersOrders/${idUser}`;

    return this.http.get<OrderDTO[]>(orderURL,{headers});
  }

  createOrder(orderDTO:OrderDTO):Observable<string>{
    const headers = this.authService.createAuthHeaders();
    const createOrderURL='https://localhost:8080/order/createOrder'

    return this.http.post<string>(createOrderURL,orderDTO,{headers,responseType: 'text' as 'json'});
  }

  getOrganizerOrders(idOrg:string):Observable<OrderDTO[]>{
    const headers = this.authService.createAuthHeaders();
    const organizerOrdersURL=`https://localhost:8080/order/getOrganizerOrders/${idOrg}`

    return this.http.get<OrderDTO[]>(organizerOrdersURL,{headers})

  }

  deleteOrder(idOrged:string):Observable<any>{
    const headers = this.authService.createAuthHeaders();
    const deleteOrderURL=`https://localhost:8080/order/deleteOrder/${idOrged}`
    
    return this.http.delete(deleteOrderURL, { headers }).pipe(
      catchError(error => {
       
        console.error('An error occurred:', error);
        return throwError('Something went wrong while deleting the event.');
      })
    );
  }
  
}

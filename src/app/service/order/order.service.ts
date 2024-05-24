import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from 'src/app/dtos/OrderDTO';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private authService:AuthService){}

  getUserOrders(idUser:string):Observable<OrderDTO[]>{
    const headers = this.authService.createAuthHeaders();
    const orderURL=`https://localhost:8080/order/getUsersOrders/${idUser}`;

    return this.http.get<OrderDTO[]>(orderURL,{headers});
  }

  createOrder(orderDTO:OrderDTO){
    const headers = this.authService.createAuthHeaders();
    const createOrderURL='https://localhost:8080/order/createOrder'

    return this.http.post<OrderDTO>(createOrderURL,orderDTO,{headers});
  }

  getOrganizerOrders(idOrg:string):Observable<OrderDTO[]>{
    const headers = this.authService.createAuthHeaders();
    const organizerOrdersURL=`https://localhost:8080/order/getOrganizerOrders/${idOrg}`

    return this.http.get<OrderDTO[]>(organizerOrdersURL,{headers})

  }
}

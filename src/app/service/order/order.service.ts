import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from 'src/app/dtos/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient){}

  getUserOrders(idUser:string):Observable<OrderDTO[]>{
    const orderURL=`http://localhost:8080/order/getUsersOrders/${idUser}`;

    return this.http.get<OrderDTO[]>(orderURL);
  }

  createOrder(orderDTO:OrderDTO){
    const createOrderURL='http://localhost:8080/order/createOrder'

    return this.http.post<OrderDTO>(createOrderURL,orderDTO);
  }
}

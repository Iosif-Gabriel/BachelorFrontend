// order-page.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../dtos/OrderDTO';
import { TokenService } from '../service/token/token.service';
import { OrderService } from '../service/order/order.service';
import { SectionService } from '../service/section/section.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orders!: OrderDTO[];
  displayedColumns: string[] = [ 'eventId', 'orderedAt', 'startDate', 'endDate', 'numberOfTickets', 'totalPrice', 'actions'];
  
  constructor(private sectionService: SectionService,private tokenService:TokenService,private orderService:OrderService){}

  ngOnInit(): void {
    const user=this.tokenService.getUser();
    const id=user.id;

    this.orderService.getUserOrders(id).subscribe(order=>{
     
      this.orders=order;
     
      this.sectionService.setOrders(this.orders);
    })
  }

  editOrder(order: OrderDTO) {
    // Implement edit functionality here
    console.log('Edit order:', order);
  }

  deleteOrder(order: OrderDTO) {
    // Implement delete functionality here
    console.log('Delete order:', order);
  }
}

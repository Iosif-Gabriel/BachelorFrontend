// order-page.component.ts
import { Component, Input, OnInit } from '@angular/core';
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

  @Input() selectedOrders:OrderDTO[]=[]
  @Input() type:string=''

  isEditOpen:boolean=false;
  orders!: OrderDTO[];
  displayedColumns: string[] = [ 'eventId', 'orderedAt', 'startDate', 'endDate', 'nrOfGuests', 'totalPrice', 'actions'];
  
  constructor(private sectionService: SectionService,private tokenService:TokenService,private orderService:OrderService){}

  ngOnInit(): void {
    const user=this.tokenService.getUser();
    const id=user.id;
    console.log(this.type);
    //this.orderService.getOrganizerOrders(id).subscribe(order=>{
     
      this.orders=this.selectedOrders;
     
      this.sectionService.setOrders(this.orders);
   // })
  }

  editOrder(order: OrderDTO) {
    // Implement edit functionality here
   console.log('Edit order:', order);
    this.isEditOpen=true;
  }
  
  saveOrder(order: OrderDTO): void {
    // Salvează modificările făcute în comanda selectată
    // Apoi dezactivează modul de editare
    order.isEditing = false;
  }
  
  deleteOrder(order: OrderDTO): void {
    // Șterge comanda din listă
  }

  toggleEdit(order:OrderDTO){
    this.orders.forEach(o => o.isEditing = false);
    // Activează modul de editare doar pentru comanda selectată
    order.isEditing = true;
    console.log(order)
  }
  
}

// order-page.component.ts
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { OrderDTO } from '../../dtos/OrderDTO';
import { TokenService } from '../../service/token/token.service';
import { OrderService } from '../../service/order/order.service';
import { SectionService } from '../../service/section/section.service';
import { ModalService } from '../../service/modal/modal.service';
import { formatDate } from 'date-fns';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit,AfterViewInit {

  @Input() selectedOrders:OrderDTO[]=[]
  @Input() type:string=''

  isEditOpen:boolean=false;
  orders!: OrderDTO[];
  displayedColumns: string[] = [ 'eventId', 'orderedAt', 'startDate', 'endDate', 'nrOfGuests', 'totalPrice'];
  dataSource!: MatTableDataSource<OrderDTO>;

  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(  private cdr: ChangeDetectorRef,private viewContainerRef: ViewContainerRef,private modalService:ModalService,private sectionService: SectionService,private tokenService:TokenService,private orderService:OrderService){}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    const user=this.tokenService.getUser();
    const id=user.id;
    console.log(this.type);
    //this.orderService.getOrganizerOrders(id).subscribe(order=>{
     
      this.orders=this.selectedOrders;
     console.log(this.orders);
     this.dataSource = new MatTableDataSource(this.orders);
      this.sectionService.setOrders(this.orders);
   // })
  }

  formatDateTable(dateTime: string, type:string): string {
    
    if(type==='orderedAt'){
      return formatDate(dateTime, 'dd/MM/yyyy, HH:mm:ss');

    }
    return formatDate(dateTime,'dd/MM/yyyy');
  }

  editOrder(order: OrderDTO) {
    
   console.log('Edit order:', order);
    this.isEditOpen=true;
  }
  
  saveOrder(order: OrderDTO): void {
  
    order.isEditing = false;
  }
  

  deleteOrder(order: OrderDTO): void {
    console.log(order);
    this.orderService.deleteOrder(order.id).subscribe(
      resp => {
        console.log('Event deleted successfully:', resp);
        
        const index = this.orders.findIndex(or => or.id === order.id);
        if (index !== -1) {
          this.orders.splice(index, 1);
          this.orders = [...this.orders]; 
          this.cdr.detectChanges();
        }
  
        
        this.modalService.openModal("order succ",this.viewContainerRef, 'Deletion Successful', 'Success', 'Success');
      },
      error => {
        console.error('Failed to delete event:', error);
        
        this.modalService.openModal("order err",this.viewContainerRef, 'Deletion Error', 'Error', 'Error');
      }
    );
  }
  
  

  toggleEdit(order:OrderDTO){
    this.orders.forEach(o => o.isEditing = false);
    
    order.isEditing = true;
    console.log(order)
  }
  
}

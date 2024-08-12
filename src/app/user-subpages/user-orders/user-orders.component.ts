import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/dtos/OrderDTO';
import { OrderService } from 'src/app/service/order/order.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SectionService } from 'src/app/service/section/section.service';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  userOrders:OrderDTO[]=[];
  attendeeOrders:OrderDTO[]=[];
  selectedOrders:string ='My Events Orders';

  constructor(private tokenService:TokenService,private orderService:OrderService,private sectionService:SectionService,private popupService:PopupService){}

onOrderTypeChange(selectedValue: string): void {
  const userId = this.tokenService.getUser().id;
  this.sectionService.setActiveSection("userOrdes");
  if (selectedValue === 'My Events Orders') {
    this.orderService.getOrganizerOrders(userId).subscribe(orders => {
    
      this.userOrders = orders;
      this.popupService.setisEventPageOpen(true);
      this.sectionService.setActiveSection("userOrdes");
    });
  } else if (selectedValue === 'Attendee Orders') {
    this.orderService.getUserOrders(userId).subscribe(orders => {
     
      this.attendeeOrders = orders;
      
      this.popupService.setisEventPageOpen(true);
      
    });
  }
}

ngOnInit(): void {


  this.onOrderTypeChange(this.selectedOrders);
}


  isActiveSection(section: string): boolean {
    return this.sectionService.getActiveSection() === section;
  }

  isActiveActivity(activity:string):boolean{
    console.log(activity);
    return this.sectionService.getActiveActivity()==activity;
  }

}

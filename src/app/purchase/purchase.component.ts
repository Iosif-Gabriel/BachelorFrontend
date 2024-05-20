import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { EventWithPicturesDTO } from '../dtos/EventWithPicturesDTO';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { OrderDTO } from '../dtos/OrderDTO';
import { TokenService } from '../service/token/token.service';
import { OrderService } from '../service/order/order.service';
import { ModalService } from '../service/modal/modal.service';
import { WebSocketService } from '../service/websocket/web-socket.service';
import { NotificationDTO } from '../dtos/NotificationDTO';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {

  @Input() event: EventWithPicturesDTO | undefined;
  @Input() purchaseForm!: FormGroup;
  invalidRange:boolean=false;
  tooManyGuests:boolean=true;
  inputHasValue: boolean = false;
  guestsSelected: boolean = false;

  constructor(private websocketService:WebSocketService,private viewContainerRef: ViewContainerRef ,private modalService:ModalService,private orderService:OrderService,private tokenS:TokenService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nrGuests:['',Validators.required]
    }, { validators: this.dateRangeValidator });
    
  }

  dateRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
  
    if (!startDate || !endDate) return null;
  
    const eventStartTime = this.event ? new Date(this.event.startTime) : undefined;
    const eventEndTime = this.event ? new Date(this.event.endTime) : undefined;
  
    if (eventStartTime && eventEndTime) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start.getTime() < eventStartTime.getTime() || end.getTime() > eventEndTime.getTime()) {
        this.invalidRange=true;
        return { 'invalidRange': true };
      }
    }
    
    this.invalidRange=false;
    return null;
  }
  
  
  checkMaxValue(event: any) {
    const enteredValue = parseInt(event.target.value);
    const maxValue = this.event?.nrGuests;
    
    if (maxValue && event.target.value !== '') {
      this.inputHasValue = true; // Setează inputHasValue pe true dacă utilizatorul a introdus o valoare
      if (enteredValue > maxValue) {
        this.tooManyGuests = true;
      } else {
        this.tooManyGuests = false;
      }
    } else {
      this.inputHasValue = false; 
      this.tooManyGuests = false;
    }

    if (enteredValue > 0) {
      this.guestsSelected = true;
    } else {
      this.guestsSelected = false;
    }
  }
  
  
  purchase() {
 
    if (this.purchaseForm.valid) {
      const user = this.tokenS.getUser();
      const eventId = this.event?.id;
      const order: OrderDTO = {
        userId: user?.id ?? 0,
        eventId: typeof eventId === 'string' ? parseInt(eventId, 10) : eventId ?? 0,
        eventName: this.event?.eventName ?? 'Unknown Event', 
        orderedAt: new Date().toISOString(),
        startDate: this.purchaseForm.value.startDate ?? 'Unknown Start Date', 
        endDate: this.purchaseForm.value.endDate ?? 'Unknown End Date',
        nrOfGuests: this.purchaseForm.value.nrGuests ?? 0, 
        totalPrice: (this.purchaseForm.value.nrGuests ?? 0) * (this.event?.price ?? 0) ,
        isEditing:false
      };

      this.orderService.createOrder(order).subscribe(res => {
        if(res){
          if (this.event && this.event.nrGuests !== undefined) {
            this.event.nrGuests = (this.event.nrGuests - (this.purchaseForm.value.nrGuests ?? 0)) || 0;
          
          }
        
        }
        
      }, (error) => {
        this.modalService.openModal(this.viewContainerRef, 'Error', 'Purchaseing does not work at the moment!', './assets/images/icons/cancel.png');
      });
      
      
     if(this.event){
      const notif:NotificationDTO={
        userId: this.event?.idUser,
        message: 'O noua comanda pentru evenimentul',
        type: 'order',
        eventName: this.event.eventName,
        eventId: this.event.id,
        seen:false
      }
      this.websocketService.sendNotification(this.event?.idUser,notif);
     }

    } else {
      console.log("Formularul este invalid.");

    }
  }
  
  
}

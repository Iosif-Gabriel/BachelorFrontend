import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isRegisterOpen :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isRegisterButtonPressed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isCreatEventOpen:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isEventPageOpen:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isImagePageOpen:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  closeNotification: EventEmitter<void> = new EventEmitter<void>();
  closeCreateReview: EventEmitter<void> = new EventEmitter<void>();
  closeCreateEvent: EventEmitter<void>=new EventEmitter<void>();
  private _isUserOrgEventsOpen:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _OrdersOpen:BehaviorSubject<string> = new BehaviorSubject<string>("My Events Orders");
 
  constructor() { }

  get selectedOrders():Observable<string>{
    return this._OrdersOpen.asObservable();
  }

  setOrdersOpen(ordersType:string){
    this._OrdersOpen.next(ordersType);
  }


  get isUserOrgEventsOpen():Observable<boolean>{
    return this._isUserOrgEventsOpen.asObservable();
  }

  setisUserOrgEventsOpen(value:boolean):void{
    this._isUserOrgEventsOpen.next(value);
  }

  get isEventPageOpen():Observable<boolean>{
    return this._isEventPageOpen.asObservable();
   }
  
   setisEventPageOpen(value: boolean): void {
    this._isEventPageOpen.next(value);
  }
  
 get isCreatEventOpen():Observable<boolean>{
  return this._isCreatEventOpen.asObservable();
 }

 setCreatEventOpen(value: boolean): void {
  this._isCreatEventOpen.next(value);
}

setImageModalOpen(value:boolean):void{
  this._isImagePageOpen.next(value);
}

  get isRegisterButtonPressed():Observable<boolean>{
    return this._isRegisterButtonPressed.asObservable();
  }

  setRegisterButtonPressed(value: boolean): void {
    this._isRegisterButtonPressed.next(value);
  }

  get isOpen(): Observable<boolean> {
    return this._isOpen.asObservable();
  }

  get isRegisterOpen(): Observable<boolean> {
    return this._isRegisterOpen.asObservable();
  }


  openRegisterPopup(): void {
    this._isRegisterOpen.next(true);
  }


  closeRegisterPopup(): void {
    this._isRegisterOpen.next(false);
  }

  openPopup(): void {
    this._isOpen.next(true);
  }

  closePopup(): void {
    this._isOpen.next(false);
  }
  
}

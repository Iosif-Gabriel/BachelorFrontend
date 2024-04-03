import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isRegisterOpen :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isRegisterButtonPressed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  
 

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

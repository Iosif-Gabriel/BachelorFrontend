import { ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { PopupService } from '../popup/popup.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRef!: ComponentRef<ModalComponent>;
  componentSubscriber!: Subject<string>;
  registerEvent = new Subject<string>();
  
  constructor(private resolver: ComponentFactoryResolver,private popupService: PopupService) {
    
  }
  

  
  openModal(entry: ViewContainerRef, modalTitle: string, modalBody: string, imagePath?: string): Observable<string> {
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.body = modalBody;
    this.componentRef.instance.imagePath = imagePath || '';
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe(() => this.confirm());
    return this.registerEvent.asObservable();
  }
  
  
  closeModal() {
    this.registerEvent.complete();
    this.componentRef.destroy();
    this.popupService.closeRegisterPopup();

  }

  confirm() {
    this.componentSubscriber.next('confirm');
    this.closeModal();
  }

  emitEvent(eventName: string) {
    if(this.registerEvent){
      this.registerEvent.next(eventName);
    }
  }
}

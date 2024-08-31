import { ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PopupService } from '../popup/popup.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRef!: ComponentRef<ModalComponent>;
  componentSubscriber!: Subject<string>;
  registerEvent = new Subject<string>();
  private activeModals: Map<string, ComponentRef<ModalComponent>> = new Map(); 
  private modalCloseEvent = new Subject<string>();
  
  constructor(private resolver: ComponentFactoryResolver,private popupService: PopupService) {
    
  }
  
  openModal(modalId:string,entry: ViewContainerRef, modalTitle: string,modalBody: string, imagePath?: string): Observable<string> {
    console.log(`Opening modal with ID: ${modalId}`);
  const factory = this.resolver.resolveComponentFactory(ModalComponent);
  const componentRef = entry.createComponent(factory);
  
  componentRef.instance.modalid = modalId;
  componentRef.instance.title = modalTitle;
  componentRef.instance.body = modalBody;
  componentRef.instance.imagePath = imagePath || '';
  componentRef.instance.closeMeEvent.subscribe(() => this.closeModal(modalId));
  //componentRef.instance.confirmEvent.subscribe(() => this.handleConfirm(modalId));
  
  this.activeModals.set(modalId, componentRef);
  return this.modalCloseEvent.asObservable();
  }

  isModalOpen(modalId: string): boolean {
    return this.activeModals.has(modalId);
  }
  
  
    


  closeModal(modalId: string) {
    console.log(`Closing modal with ID: ${modalId}`)
    const componentRef = this.activeModals.get(modalId);
    if (componentRef) {
      componentRef.destroy();
      this.activeModals.delete(modalId);
      this.modalCloseEvent.next(modalId);
    if(componentRef.instance.title==='Registration Successful' ){

      this.popupService.closeRegisterPopup();

    }else if(componentRef.instance.title==='Thank you for your Feedback!'){
     
      this.popupService.closeCreateReview.emit();

    }else if(componentRef.instance.title==='Event edited succesfully!'){
      this.popupService.setCreatEventOpen(false);

    }else if(componentRef.instance.title==='Event created succesfully!'){
        this.popupService.setCreatEventOpen(false);
        this.popupService.setImageModalOpen(false);
    }
    } else {
      console.error(`Modal with ID ${modalId} not found.`);
    }
  }

 

 

  confirm() {
    this.componentSubscriber.next('confirm');
    //this.closeModal();
  }

  // emitEvent(eventName: string) {
  //   if(this.registerEvent){
  //     this.registerEvent.next(eventName);
  //   }
  // }
}

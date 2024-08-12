import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { PopupService } from '../service/popup/popup.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy,OnChanges  {

  constructor(private popupService:PopupService) {}
 

  @Input() title: string = ' ';
  @Input() body: string = ' ';
  @Input() imagePath: string = ' '; 
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  imageDataUrl: string = '';
  success:boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['imagePath']) {
    //   console.log('Image Path changed:', this.imagePath);
    //   if (this.imagePath === 'Success') {
    //     this.success = true;
    //   } else if (this.imagePath === 'Error') {
    //     this.success = false;
    //   }
      
    // }
    
  }
  

  ngOnInit(): void {
  
    if (this.imagePath && this.imagePath==='Success') {
     this.success=true;
    }else if(this.imagePath && this.imagePath==='Error'){
      this.success=false;
    }

  }

  closeMe() {
     this.closeMeEvent.emit();
    // this.popupService.isCreatEventOpen.subscribe(isOpen => {
    //   if (isOpen === true) {
    //     this.popupService.setCreatEventOpen(false);
    //   }
    // });
  }
  

  confirm() {
    this.confirmEvent.emit();
  }

  ngOnDestroy(): void {
    console.log('Modal destroyed');
  }
  
}

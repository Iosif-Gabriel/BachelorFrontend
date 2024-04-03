import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor() {}

  @Input() title: string = '';
  @Input() body: string = '';
  @Input() imagePath: string = ''; 
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  imageDataUrl: string = '';

  ngOnInit(): void {
    console.log('Modal init');
    if (this.imagePath && this.imagePath.startsWith('./assets/') && this.imagePath.endsWith('.png')) {
      this.imageDataUrl = this.imagePath;
    }
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() {
    this.confirmEvent.emit();
  }

  ngOnDestroy(): void {
    console.log('Modal destroyed');
  }
  
}

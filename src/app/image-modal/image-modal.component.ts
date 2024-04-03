import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageModalService } from '../service/modal/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  @Input() imageUrl: string | undefined; // Image URL
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() openModalEvent = new EventEmitter<void>();
  tags: string[] = [];
  tag!: string;
  selectedOption: string = "Gallery";
  isGallery:boolean=false;

  constructor(private modalService: ImageModalService) {} // Inject the ModalService

  addTag(tag: string) {
    this.tags.push(tag);
  }

  saveTags() {
    // Implement logic to save tags to image metadata
  }

  openModal() {
    this.openModalEvent.emit();
  }

  closeImage(){
    this.closeModalEvent.emit(); // Emite evenimentul pentru închiderea modalului
  }

  isModalOpen(): boolean {
    return this.modalService.isOpen();
  }
}

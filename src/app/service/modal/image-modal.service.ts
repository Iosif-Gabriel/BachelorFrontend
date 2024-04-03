import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  private modals: any = {};
  private isModalOpen: boolean = false;
  constructor() {}

 open(): void {
  this.modals = true;
  this.isModalOpen=true;
}
  close(): void {
    this.modals = false;
    this.isModalOpen=false;
  }

  getModal(id: string) {
    return this.modals[id];
  }

  isOpen(): boolean {
    return this.isModalOpen;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  isVisible: boolean = true;
  code: string[] = ['', '', '', '', '', ''];

  
  autoFocusNext(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.code.length - 1) {
      const nextInput = document.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement;
      nextInput.focus();
    }
  }

  verifyCode() {
    const enteredCode = this.code.join('');
    console.log('Verification Code:', enteredCode);
    
    this.closePopup();
  }

  closePopup() {
    this.isVisible = false;
  }
}

import { Component, ViewContainerRef } from '@angular/core';
import { VerifyAccountService } from '../../../service/verifyAccout/verifyAccount.service';
import { ModalService } from '../../../service/modal/modal.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  isVisible: boolean = true;
  code: string[] = ['', '', '', '', '', ''];
  isCodeInvalid: boolean = false;
  messageMail:boolean=false;
  constructor(private verifyService:VerifyAccountService,private modalService:ModalService,private viewContainerRef: ViewContainerRef){}

  
  autoFocusNext(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.code.length - 1) {
      const nextInput = document.querySelector(`input:nth-child(${index + 2})`) as HTMLInputElement;
      nextInput.focus();
    }
  }

handleCodeInput(): void {
  const enteredCode = this.code.join('');
  
  if (enteredCode.length < 6) {
      this.isCodeInvalid = false; 
      return;
  }

  this.verifyService.verifyCode(enteredCode).subscribe(response => {
    console.log(response);
      this.isCodeInvalid = response.tokenType !== 'VERIFICATION_VALID';
      
      if (!this.isCodeInvalid) {
        this.modalService.openModal("verify account",this.viewContainerRef,"Verification Succesfull","You can log in now.","Success");
          this.closePopup();
       
      }
  });
}

sendMail(){
  this.messageMail=true;
  setTimeout(() => {
    this.messageMail = false;
  }, 3000);
  this.verifyService.triggerFunction();
}




  closePopup() {
    this.isVisible = false;
  }
}

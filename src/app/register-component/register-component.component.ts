import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PopupService } from '../service/popup/popup.service';
import { RegisterRequest } from '../dtos/RegisterRequest';
import { RegisterService } from '../service/register/register.service';
import { Subscription } from 'rxjs';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip'
import { FormControl, Validators } from '@angular/forms';
import { ModalService } from '../service/modal/modal.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  registerPopupOpen: boolean = false;

  registerReq: RegisterRequest = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    username: '',
    password: '',
    registrationDate:new Date(),
  };
  confirmPassword:string = "";
  passwordsMatchs: boolean = true;
  isRegisterPressed:boolean=false;
  touched: boolean = false;
  email:boolean =false;


  constructor(private popUpService: PopupService, private registerRequest:RegisterService,private modalService:ModalService,private viewContainerRef: ViewContainerRef) {}


  ngOnInit(): void {
    this.popUpService.isRegisterOpen.subscribe(isRegisterOpen => {
      this.registerPopupOpen = isRegisterOpen;

    });
  }

  closePopup():void{
    this.popUpService.closeRegisterPopup();
  }


  confirmRegister(): void {

    if (!this.validateRegisterRequest(this.registerReq)) {
        console.error('Invalid registerReq. Registration aborted.');
       // this.modalService.openModal('register err',this.viewContainerRef, 'Registration Error', 'Please complete all the boxes', 'Error');
        return;
    }


    this.registerRequest.register(this.registerReq).subscribe(
        (response) => {
       console.log(response);
            if (response.tokenType === 'ALREADY_EXISTING_USERNAME') {
                this.modalService.openModal('register',this.viewContainerRef, 'Registration Error', 'Username already exists. Please choose a different username.', 'Error');
            } else if (response.tokenType === 'VERIFICATION_PENDING') {
                console.log('Register successful:', response);
               
                this.modalService.openModal('register succ',this.viewContainerRef, 'Registration Successful', 'A 6 cod digit has been sent to your email for validation.', 'Success');
            } else {
                
                this.modalService.openModal('register pend',this.viewContainerRef, 'Registration Error', 'Unexpected response from the server. Please try again later.', 'Error');
            }
        },
        (error) => {
            
            console.error('Error during registration:', error);
            this.modalService.openModal('register pend',this.viewContainerRef, 'Registration Error', 'An error occurred during registration. Please try again later.', 'Error');
        }
    );
}

validateRegisterRequest(registerReq: RegisterRequest): boolean {
  const usernameMinLength = 4;
  const passwordMinLength = 8;

 

  if (!/^[a-zA-Z]+$/.test(registerReq.firstName)) {
    console.error('Invalid first name');
    this.modalService.openModal('register firstName', this.viewContainerRef, 'Registration Error', 'Please enter a valid first name.', 'Error');
    return false;
  }

  if (!/^[a-zA-Z]+(?:-[a-zA-Z]+)?$/.test(registerReq.lastName)) {
    console.error('Invalid last name');
    this.modalService.openModal('register lastName', this.viewContainerRef, 'Registration Error', 'Please enter a valid last name.', 'Error');
    return false;
  }

  if (!/^\+?[0-9]{1,3}-?[0-9]{3,}$/.test(registerReq.phoneNumber)) {
    console.error('Invalid phone number');
    this.modalService.openModal('register phoneNumber', this.viewContainerRef, 'Registration Error', 'Please enter a valid phone number.', 'Error');
    return false;
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registerReq.email)) {
    console.error('Invalid email');
    this.modalService.openModal('register email', this.viewContainerRef, 'Registration Error', 'Please enter a valid email.', 'Error');
    return false;
  }

  if (registerReq.username.trim() === '') {
    console.error('Username cannot be empty.');
    this.modalService.openModal('register username', this.viewContainerRef, 'Registration Error', 'Username cannot be empty.', 'Error');
    return false;
  }
  if (registerReq.username.length < usernameMinLength) {
    console.error('Username must be at least 4 characters long.');
    this.modalService.openModal('register username', this.viewContainerRef, 'Registration Error', 'Username must be at least 4 characters long.', 'Error');
    return false;
  }

  if (registerReq.password.trim() === '') {
    console.error('Password cannot be empty.');
    this.modalService.openModal('register password', this.viewContainerRef, 'Registration Error', 'Password cannot be empty.', 'Error');
    return false;
  }
  if (registerReq.password.length < passwordMinLength) {
    console.error('Password must be at least 8 characters long.');
    this.modalService.openModal('register password', this.viewContainerRef, 'Registration Error', 'Password must be at least 8 characters long.', 'Error');
    return false;
  }

  return true;
}






  passwordsMatch(): void {
    this.passwordsMatchs = this.registerReq.password === this.confirmPassword;

  }

  validateEmail(emailControl: any) {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   
    if (emailControl.value && !emailPattern.test(emailControl.value)) {
      emailControl.control.setErrors({ invalidEmail: true });
    } else {
      emailControl.control.setErrors(null);
    }
  }
  


  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  keyPressLetters(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
  
    if ((charCode < 65 || charCode > 90) && 
        (charCode < 97 || charCode > 122)) { 
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  
  

}

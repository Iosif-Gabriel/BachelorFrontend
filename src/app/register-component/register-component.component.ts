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
  registerReq: RegisterRequest = { // Initialize registerReq with an empty object
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    username: '',
    password: ''
  };
  confirmPassword:string = "";
  passwordsMatchs: boolean = true;
  isRegisterPressed:boolean=false;
  touched: boolean = false;

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]+')
  ]);
 

  constructor(private popUpService: PopupService, private registerRequest:RegisterService,private modalService:ModalService,private viewContainerRef: ViewContainerRef) {}


  ngOnInit(): void {
    this.popUpService.isRegisterOpen.subscribe(isRegisterOpen => {
      this.registerPopupOpen = isRegisterOpen;

    });
  }

  closePopup():void{
    this.popUpService.closeRegisterPopup();
  }

  passwordsMatch(): void {
    this.passwordsMatchs = this.registerReq.password === this.confirmPassword;

  }

  confirmRegister(): void {
    this.popUpService.setRegisterButtonPressed(true);
  
    if (!this.validateRegisterRequest(this.registerReq)) {
      console.error('Invalid registerReq. Registration aborted.');
      this.modalService.openModal(this.viewContainerRef, 'Registration Error', 'Please complete all the boxes','./assets/images/icons/cancel.png');
      return;
    }
    // this.modalService.openModal(this.entry, 'Account created successfully!', '', './assets/images/icons/yes.png');
  
    this.registerRequest.register(this.registerReq).subscribe(
      (response) => {
        console.log('Register successful:', response);
        this.modalService.openModal(this.viewContainerRef, 'Registration Successful', 'Congratulations! Your registration was successful.','./assets/images/icons/yes.png');
      },
      (error) => {
        console.error('Error during registration:', error);
        this.modalService.openModal(this.viewContainerRef, 'Registration Error', 'An error occurred during registration. Please try again later.','./assets/images/icons/cancel.png');
      }
    );
  }
  
 
  validateRegisterRequest(registerReq: RegisterRequest): boolean {
    const firstNameRegex = /^[a-zA-Z]+$/;
    const lastNameRegex = /^[a-zA-Z]+(?:-[a-zA-Z]+)?$/;
    const phoneNumberRegex = /^\+?[0-9]{1,3}-?[0-9]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]+$/;
  
    if (!firstNameRegex.test(registerReq.firstName)) {
      console.error('Invalid first name:', registerReq.firstName);
      return false;
    }
  
    if (!lastNameRegex.test(registerReq.lastName)) {
      console.error('Invalid last name:', registerReq.lastName);
      return false;
    }
  
    if (!phoneNumberRegex.test(registerReq.phoneNumber)) {
      console.error('Invalid phone number:', registerReq.phoneNumber);
      return false;
    }
  
    if (!emailRegex.test(registerReq.email)) {
      console.error('Invalid email:', registerReq.email);
      return false;
    }
  
    if (!addressRegex.test(registerReq.address)) {
      console.error('Invalid address:', registerReq.address);
      return false;
    }

  
    return true;
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
  
    // Doar literele mici și mari
    if ((charCode < 65 || charCode > 90) && // Litere mari
        (charCode < 97 || charCode > 122)) { // Litere mici
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  
  

}

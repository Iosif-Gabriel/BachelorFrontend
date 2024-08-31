import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from 'src/app/dtos/UserDTO';
import { ModalService } from 'src/app/service/modal/modal.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SectionService } from 'src/app/service/section/section.service';
import { TokenService } from 'src/app/service/token/token.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{


  user:any='';
  confirmPassword:string = "";
  passwordsMatchs: boolean = true;
  userDTO:UserDTO={
    id: '',
    firsName: '',
    lastName: '',
    username: '',
    password: '',
    phoneNumber: '',
    email: '',
    address: '',
    profilePictureUrl: '',
    role: ''
  };
  emailFormSubmitted = false;
  emailForm!: FormGroup;
  passwordForm!:FormGroup;
  passwordFormSubmitted=false;
  constructor(private modalService:ModalService,private viewContainerRef: ViewContainerRef,private fb: FormBuilder,private tokenService:TokenService,private sectionService:SectionService,private userService:UserService,private popupService:PopupService){
    this.emailForm = this.fb.group({
      email: [
        '', 
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ]
    });

    this.passwordForm = this.fb.group({
      password: [
        '', 
        [Validators.required, Validators.minLength(8)]
      ],
      confirmPassword: [
        '', 
        [Validators.required, Validators.minLength(8)]
      ]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.sectionService.setActiveSection("userProfile");
    const user=this.tokenService.getUser();
    this.userService.getUserbyId(user.id).subscribe(userStats=>{
      this.popupService.setisEventPageOpen(true);
      this.user=user
      this.userDTO.id=user.id;
      this.userDTO.role=user.role
    });
   
  
  }



  changeEmail() {
    this.emailFormSubmitted = true;  

    if (this.emailForm.valid) {
      this.userDTO.email=this.emailForm.get('email')?.value;
      this.userService.updateUserDetails(this.userDTO).subscribe(res=>{

      })
      this.modalService.openModal('change email success', this.viewContainerRef, 'Email changed succesfully', 'Success', 'Success');
      this.emailFormSubmitted = false; 
    } else {
      this.modalService.openModal('change email error', this.viewContainerRef, 'Change email error', 'Please complete the filed', 'Error');
    }
  }

  isEmailInvalid(): boolean {
    const emailControl = this.emailForm.get('email');
    return !!emailControl?.invalid && emailControl?.touched && emailControl?.value !== '';
  }

  isEmailEmpty(): boolean {
    const emailControl = this.emailForm.get('email');
    return !!(this.emailFormSubmitted && emailControl && emailControl.value === '');
  }


  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  changePassword() {
    this.passwordFormSubmitted = true; 

    if (this.passwordForm.valid) {
      this.userDTO.password=this.passwordForm.get('password')?.value;
      this.userService.updateUserDetails(this.userDTO).subscribe();
      this.modalService.openModal('change password succ', this.viewContainerRef, 'Password changed succesfully', 'Success!', 'Success');
      this.passwordFormSubmitted = false; 
    } else {
      this.modalService.openModal('change password error', this.viewContainerRef, 'Change password error', 'Please complete both fields', 'Error');
    }
  }

  isFieldEmpty(field: string): boolean {
    const control = this.passwordForm.get(field);
    return this.passwordFormSubmitted && control?.value === '';
  }

  hasPasswordMismatch(): boolean {
    return this.passwordFormSubmitted && this.passwordForm.errors?.['mismatch'];
  }
}

import { Component, OnInit } from '@angular/core';
import { PopupService } from '../service/popup/popup.service';
import { AuthenticationRequest } from '../dtos/AuthenticationRequest';
import { LoginServiceService } from '../service/login/login-service.service';
import { TokenService } from '../service/token/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse } from '../dtos/AuthenticationResponse';
import { UserService } from '../service/user/user.service';
import { UserDTO } from '../dtos/UserDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  loginPopupOpen: boolean = false;
  loginForm!: FormGroup;
  constructor(private router:Router,private tokenService:TokenService,private popUpSerivce: PopupService, private loginService:LoginServiceService,private formBuilder: FormBuilder,private userService:UserService) {}

  authReq:AuthenticationRequest ={
    username: '',
    password: ''
  };


  ngOnInit(): void {
    this.popUpSerivce.isOpen.subscribe(isOpen => {
      this.loginPopupOpen = isOpen;

    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Utilizați Validators.required pentru a face câmpul obligatoriu
      password: ['', Validators.required]  // Utilizați Validators.required pentru a face câmpul obligatoriu
    });

  }

  closePopup():void{
    this.popUpSerivce.closePopup();
  }

  // confirmLogin(){

  //   this.loginService.login(this.authReq).subscribe(
  //     (response) => {
  //      this.tokenService.saveToken(response.token);
  //      console.log('logat');
  //     },
  //     (error) => {
  //       console.error('Error during login:', error);
  //     }
  //   );
  //   this.closePopup();
  // }


  confirmLogin():void{
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let user = new AuthenticationRequest();
    let user2=new UserDTO();
    user.username = this.loginForm.get('username')?.value;
    user.password = this.loginForm.get('password')?.value;
    this.loginService.login(user).subscribe({
      next:(token:AuthenticationResponse)=>{
        console.log("Login token " + token);
        this.tokenService.saveToken(token.token);
        if(token.tokenType=="TOKEN"){
          this.userService.getByToken().subscribe({
            next: any => {
              user2 = any;
              this.tokenService.saveUser(any);
              if (user2.role == "ADMIN") {
                this.router.navigateByUrl("/adminHome");
              } else {
                 this.router.navigateByUrl("/userHome");
             
              }
            }
          })
        }else if(token.tokenType=='VERIFICATION_EXPIRED'){
          this.userService.verifyToken(token.tokenType);
        } 
      }
    })
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

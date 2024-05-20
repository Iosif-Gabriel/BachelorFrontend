import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PopupService } from '../service/popup/popup.service';
import { AuthenticationRequest } from '../dtos/AuthenticationRequest';
import { LoginServiceService } from '../service/login/login-service.service';
import { TokenService } from '../service/token/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse } from '../dtos/AuthenticationResponse';
import { UserService } from '../service/user/user.service';
import { UserDTO } from '../dtos/UserDTO';
import { Router } from '@angular/router';
import { ModalService } from '../service/modal/modal.service';
import { WebSocketService } from '../service/websocket/web-socket.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  loginPopupOpen: boolean = false;
  loginForm!: FormGroup;
  constructor(private wesocketService:WebSocketService,private router:Router,private tokenService:TokenService,private popUpSerivce: PopupService, private loginService:LoginServiceService,private formBuilder: FormBuilder,private modalService:ModalService,private viewContainerRef: ViewContainerRef,private userService:UserService) {}

  authReq:AuthenticationRequest ={
    username: '',
    password: ''
  };


  ngOnInit(): void {
    this.popUpSerivce.isOpen.subscribe(isOpen => {
      this.loginPopupOpen = isOpen;

    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], 
      password: ['', Validators.required]
    });

  }

  closePopup():void{
    this.popUpSerivce.closePopup();
  }



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
        console.log("Login token " + token.tokenType);
        this.tokenService.saveToken(token.token);
        if(token.tokenType=="TOKEN"){
          this.userService.getByToken().subscribe({
            next: any => {
              user2 = any;
              this.tokenService.saveUser(any);
              if (user2.role === "ADMIN") {
                this.router.navigateByUrl("/adminHome");
              } else {
                 this.router.navigateByUrl("/userHome");
                 const user=this.tokenService.getUser();
                 this.wesocketService.connectToWebSocket(user.id);
              }
            }
          })
        }else if(token.tokenType==='VERIFICATION_EXPIRED'){
          this.userService.verifyToken(token.tokenType);

        }else if (token.tokenType==='WRONG_PASSWORD'){
          this.modalService.openModal(this.viewContainerRef, 'Login Error', 'Username or Password incorrect','./assets/images/icons/cancel.png');
        }
      },
      error: (error) => {
       
          this.modalService.openModal(this.viewContainerRef, 'Login Error', 'Username or Password incorrect','./assets/images/icons/cancel.png');
        
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

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
import { VerifyService } from '../service/verify/verify.service';
import { LogoutService } from '../service/logout/logout.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  loginPopupOpen: boolean = false;
  loginForm!: FormGroup;
  verify:boolean=false;
  oldCode:string='';
  constructor(private logoutService:LogoutService,private verifyService:VerifyService,private wesocketService:WebSocketService,private router:Router,private tokenService:TokenService,private popUpSerivce: PopupService, private loginService:LoginServiceService,private formBuilder: FormBuilder,private modalService:ModalService,private viewContainerRef: ViewContainerRef,private userService:UserService) {
    this.verifyService.triggerFunction$.subscribe(() => {
      this.sendCodeAgain();
    });
  }

  authReq:AuthenticationRequest ={
    username: '',
    password: ''
  };


  ngOnInit(): void {
    this.popUpSerivce.isOpen.subscribe(isOpen => {
      this.loginPopupOpen = isOpen;

    });

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  closePopup():void{
    this.popUpSerivce.closePopup();
  }



  confirmLogin():void{
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.modalService.openModal("login empty",this.viewContainerRef,'Login Error', 'Please complete both fields.','Error')
      return;
    }
    let user = new AuthenticationRequest();
    let user2=new UserDTO();
    this.verify=false;
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
              //console.log(user2);
              this.tokenService.saveUser(any);
              if (user2.role === "ADMIN") {
                this.router.navigateByUrl("/adminHome");
              } else {
                 this.router.navigateByUrl("/userHome");
                 const user=this.tokenService.getUser();
                 this.wesocketService.connectToWebSocket(user.id);
                // this.logoutService.setupAutoLogout();
              }
            }
          })
        }else if(token.tokenType==='VERIFICATION_EXPIRED'){
          console.log(token);
          this.oldCode=token.token;
          this.verify=true;
          //this.modalService.openModal(this.viewContainerRef, 'Login Error', 'Username or Password incorrect','Error');
         

        }else if (token.tokenType==='WRONG_PASSWORD'){
          this.modalService.openModal("login wrong pass",this.viewContainerRef, 'Login Error', 'Username or Password incorrect','Error');
        
        }else if(token.tokenType==='VERIFICATION_PENDING'){
          this.oldCode=token.token;
          this.verify=true;
        }
      },
      error: (error) => {
       
          this.modalService.openModal("login wrong pass",this.viewContainerRef, 'Login Error', 'Username or Password incorrect','Error');
        
      }
    })
  }

  sendCodeAgain():void{
    
    this.verifyService.sendCode(this.oldCode).subscribe(response=>{
      console.log(this.oldCode);
      console.log(response);
    })
  }

  openRegister():void{
    this.popUpSerivce.closePopup();
    this.popUpSerivce.openRegisterPopup();
  }


  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

import { Component, ElementRef, OnInit, Renderer2, RendererStyleFlags2, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupService } from '../../../service/popup/popup.service';
import { AuthenticationRequest } from '../../../dtos/AuthenticationRequest';
import { LoginServiceService } from '../../../service/login/login-service.service';
import { TokenService } from '../../../service/token/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse } from '../../../dtos/AuthenticationResponse';
import { UserService } from '../../../service/user/user.service';
import { UserDTO } from '../../../dtos/UserDTO';
import { Router } from '@angular/router';
import { ModalService } from '../../../service/modal/modal.service';
import { WebSocketService } from '../../../service/websocket/web-socket.service';
import { VerifyAccountService } from '../../../service/verifyAccout/verifyAccount.service';


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
  @ViewChild('loginDiv', { static: true }) loginDiv!: ElementRef;
  @ViewChild('loginContent',{static:true}) loginContent!:ElementRef;
  
  constructor(private renderer: Renderer2,private verifyService:VerifyAccountService,private wesocketService:WebSocketService,private router:Router,private tokenService:TokenService,private popUpSerivce: PopupService, private loginService:LoginServiceService,private formBuilder: FormBuilder,private modalService:ModalService,private viewContainerRef: ViewContainerRef,private userService:UserService) {
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
      this.checkPopup();
    });

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  checkPopup() {
    if (this.loginPopupOpen === true) {
        const windowWidth = window.innerWidth;

        if (this.loginDiv) {
            let heightStyle = '';

           
            if (windowWidth < 768) { 
                heightStyle = 'height: 320px !important;';
            } else if (windowWidth >= 768 && windowWidth < 1024) { 
                heightStyle = 'height: 350px !important;';
            } else if(windowWidth >= 1600){ 
                heightStyle = 'height: 380px !important;';
            }

            this.loginDiv.nativeElement.setAttribute('style', heightStyle);

            if (this.loginContent) {
                this.loginContent.nativeElement.setAttribute('style', 'margin-top: 20px !important;');
            }
        }
    }
}


  closePopup():void{
    this.popUpSerivce.closePopup();
  }



  confirmLogin():void{
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.modalService.openModal("login empty",this.viewContainerRef,'Login Error', 'Please complete both fields accordingly.','Error')
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


}

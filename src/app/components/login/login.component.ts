import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { EventEmitterService } from '../../services/event-emitter.service';    
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})

export class LoginComponent implements OnInit {
  
  constructor(private LoginService:LoginService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private notifyService : NotificationService
        ) { }
   response:[]
  myForm = new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })
  ngOnInit(): void {
  }
  Login() {
    if(this.myForm.valid)
    {
      console.log(this.myForm.value)
      this.LoginService.loginUser(
        this.myForm.value,
      )
        .subscribe(
          res =>
          {
            
             localStorage.setItem("Token",res.token);
             console.log(res.token)
             localStorage.setItem("isAdmin",res.isAdmin)
             this.eventEmitterService.onLoginComponentButtonClick();  
             this.router.navigateByUrl("/")
            },
          err => this.notifyService.showError(err.error, "Login")
          
        );
    }
    }
    register(){
      this.router.navigateByUrl("/register")
    }
}

import { Component, OnInit,HostListener } from '@angular/core';
import {  Router } from '@angular/router';
@HostListener('window:scroll', ['$event'])
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
 action:string ="Sign In"
 iconClass:string="fas fa-sign-in-alt"
 root:string="/register"
  ngOnInit(): void {
    this.checkToken()
  }
  onClick(){
    
    
      if(this.action="Sign In"){
      this.root="/register"
    }
    else
    {
      this.root="/profile"
    
    }
  }
  checkToken(){
    if(localStorage.getItem('Token')!=null||localStorage.getItem('Token')!=undefined)
    {
      this.action='Profile'
      this.iconClass='far fa-user-circle'
    }
    else{
      this.action="Sing In"
      this.iconClass="fas fa-sign-in-alt"
    }
  }
  logOut(){
    localStorage.removeItem('Token')
    console.log(localStorage.getItem('Token'))
  }
}

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
 iconClass:string="fas fa-sign-in-alt fa-lg"
 root:string="/register"
  ngOnInit(): void {
    this.checkToken()
  }
  ngOnChanges() {
    console.log("change...")
    this.checkToken
  }
  onClick(){
    
   console.log(this.action)
      if(this.action=="Profile"){
      this.root="/profile"
    }
    else
    {
      this.root="/register"
    
    }
  }
   checkToken(){
    if(localStorage.getItem('Token')!=null||localStorage.getItem('Token')!=undefined)
    {
      this.action='Profile'
      this.iconClass='far fa-user-circle fa-lg'
    }
    else{
      this.action="Sing In"
      this.iconClass="fas fa-sign-in-alt fa-lg"
    }
  }
  logOut(){
    localStorage.removeItem('Token')
    console.log(localStorage.getItem('Token'))
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';

import { ProfileService } from 'src/app/services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
              private  ProfileService: ProfileService) { }
  selectedFile: File
  url:string
  userInfo
  userUpdated:{username:string,email:string,password:string,gender:string}
  orders=[]
  myForm = new FormGroup({
    username:new FormControl('',[]),
    email:new FormControl('',[]),
    password:new FormControl('',[]),
    gender:new FormControl('',[]),
  })
   ngOnInit(): void {
    this.getInfo()
    this.getOrders()
  }
 
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
    this.onUpload()
  }
  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    
        
    uploadData.append('image', this.selectedFile);
    
        
    this.ProfileService.updateImage(uploadData )
    .subscribe(
      res =>
      {
         this.url=res.image;
         console.log(res)
        },
      err => alert(err.error)
    );
  }
  getInfo(){
    this.ProfileService.getUserInfo()
    .subscribe(
     async res =>
      {
        this.userInfo=res.body;
        this.url=res.body.image;
         console.log(res)
         console.log(this.userInfo)
        },
      err => alert(err.error)
    );
  }
  updateInfo(){
    if(this.myForm.value)
    {

    console.log(this.myForm.value)
        

      
      this.ProfileService.updateInfo(this.myForm.value)
      .subscribe(
        async res=>
        {
          this.userInfo=res.body.user
          this.myForm.reset();
        }
        ,err => alert(err.error)
      )
    }
  }

  Cancel(){
    this.myForm.reset();
  }
  getOrders(){
    this.ProfileService.getOrders()
    .subscribe(
     async res =>
      {
        await res.body.forEach(element => this.orders.push(element));
         console.log(res)
        
        },
      err => alert(err.error)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uploader: FileUploader;

  constructor(
              private  ProfileService: ProfileService,
              private formBuilder: FormBuilder
              ) { }
 
  url:string
  userInfo
  userUpdated:{username:string,email:string,password:string,gender:string}
  orders=[]
 
  image
  myForm = new FormGroup({
    username:new FormControl('',[]),
    email:new FormControl('',[]),
    password:new FormControl('',[]),
    gender:new FormControl('',[]),
  })
   ngOnInit(): void {
    this.getInfo()
    this.getOrders()
    
    const uploaderOptions: FileUploaderOptions = {
      
      url: `https://api.cloudinary.com/v1_1/688922327779674:ykN6YD8W7EvXW6uIjfKJiqiIo3k@ecommerceiti/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);
  }
 
  onFileChanged(event) {
    this.image = <File>event.target.files[0];
    
    
    let uploadData=new FormData()
    uploadData.append('image', this.image);
    
        console.log(this.image)

    this.ProfileService.updateImage(uploadData )
    .subscribe(
      res =>
      {
        // this.url=res.image;
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

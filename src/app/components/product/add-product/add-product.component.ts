import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  image = null;
  title = null;
  details = null;
  price = null;
  token = localStorage.getItem("Token");
  constructor(private http: HttpClient) { 
  }
  ngOnInit(): void {
  }
  onSelectedFile(event){
    this.image = <File>event.target.files[0];
  }
  addProduct(event){
    event.preventDefault();
    console.log(this.title);
    console.log(this.image);
    console.log(this.details);
    console.log(this.price);
    console.log(this.token);
    const formData = new FormData();
    formData.append("image",this.image);
    formData.append("price",this.price);
    formData.append("details",this.details);
    formData.append("title",this.title);
    this.http.post(environment.api+'/api/product/add',formData,{
      headers: new HttpHeaders()
          .set('user-token',this.token),
          
      })
      .subscribe(  res =>{
         console.log(res);
      }
      ,
      err=>{
          console.log(err);
      
      })
  }
}

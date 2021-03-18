import {Component,OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-product',
    templateUrl:'./product.component.html'
})

export class ProductComponent  implements OnInit{
    token = localStorage.getItem("Token");
    isAdmin:boolean = localStorage.getItem("isAdmin") == "true" ;
    isAdding : boolean;
    products = [];
    constructor(private http: HttpClient,){}
    ngOnInit(): void {    
        this.isAdding = false;
        this.getAllProducts();
        console.log(this.isAdmin);
    }
    getAllProducts(){
        this.http.get(environment.api+'/api/product',{
        responseType:'json',  
        headers: new HttpHeaders()
            .set('user-token',this.token),
        
        })
        .subscribe(  res =>{
            this.products.push(...Object.values(res)[0]);   
        }
        ,
        err=>{
            console.log(err);
        
        })
    }
    //Comes from add-product component
    addProductEvent(event){
        this.products.push(event);
    }
    removeProduct(productId,index){

        const sure = confirm("Are you sure to delete this product ?");
        
        if(sure == true){
            this.http.delete(environment.api+'/api/product/'+productId,{
                headers: new HttpHeaders()
                    .set('user-token',this.token),
                    
                })
                .subscribe(  res =>{
                    console.log(index);
                    this.products.splice(index,1);
                }
                ,
                err=>{
                   
                })
        }
    }
}
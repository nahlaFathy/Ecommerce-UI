import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css', '../cart/cart.component.css']
})

export class ProductComponent implements OnInit {
    token = localStorage.getItem("Token");
    isAdmin: boolean = localStorage.getItem("isAdmin") == "true";
    user: boolean = localStorage.getItem('Token') != null;
    isAdding: boolean;
    totalProducts: number;
    allProducts = [];
    products = [];
    productImg: string = '/assets/img/products/2.png';
    page: Number = 1;
    constructor(
        private http: HttpClient,
        private ProductService: ProductService,
        private CartService: CartService,
        private notifyService : NotificationService
    ) { }
    ngOnInit(): void {
        this.isAdding = false;
        this.getAllProducts();
        console.log(this.isAdmin);
    }

    getAllProducts() {
        this.ProductService.allProducts().subscribe((response) => {
            this.allProducts = response['products'];
            this.products = this.allProducts;
            this.totalProducts = this.products.length;
        }),
            err => {
                console.log(err);
            };
    }
    //Comes from add-product component
    addProductEvent(event) {
        this.products.push(event);
    }
    removeProduct(productId, index) {

        const sure = confirm("Are you sure to delete this product ?");

        if (sure == true) {
            this.http.delete(environment.api + '/api/product/' + productId)
                .subscribe(res => {
                    console.log(index);
                    this.products.splice(index, 1);
                },
                    err => {
                        console.log(err)
                    })
        }
    }

    //add product to cart
    addCart(id) {
        this.CartService.addProduct(id).subscribe(Response => {
            this.notifyService.showSuccess("Product added successfuly !!", "Add to cart")
            console.log(Response)
        }),
            err => console.log(err)
    }

    //search for product
    search(e) {
        this.products = this.allProducts;
        this.products = this.allProducts.filter((element) => {
            return element.title.toLowerCase().includes(e.value.toLowerCase());
        });
    }
}
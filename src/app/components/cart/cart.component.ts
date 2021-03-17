import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private route:Router,
    private CartService: CartService,
  ) { }
  productImg: string = '/assets/img/3.png';
  priceImg: string = '/assets/img/4.png';
  emptyCart: boolean = false;
  total: number = 0;
  productIds = [];
  products = [];

  ngOnInit(): void {
    //get Products for the user
    this.CartService.allProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
      if (this.products.length == 0) this.emptyCart = true;
      //the total price
      this.products.forEach(element => {
        this.total += element.price;
      });
      //product ids to check ouut
      this.products.forEach(element => {
        this.productIds.push(element._id);
      });
    });    
  }

  //delete Product from cart
  deleteProduct(_product) {
    if (confirm(`Are you sure you want to delete the selected product?`)) {
      this.CartService.deleteProduct(_product).subscribe(
        () => this.ngOnInit()),
        err => {
          console.log(err);
        }
    }
  }

  //add Product to cart
  addProduct(_product) {
    this.CartService.addProduct(
      _product,
    )
      .subscribe(
        response => console.log(response),
        err => console.log(err)
      );
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/home');
  }

  //checkout products to order
  checkout() {
    if (confirm(`Are you sure you want to order?`)) {
      this.CartService.checkout(this.productIds, this.total)
      .subscribe(
        response => {
          console.log(response);
          this.ngOnInit();
        },
        err => console.log(err)
      );
    }
  }
}
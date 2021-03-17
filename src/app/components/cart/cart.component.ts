import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private CartService: CartService,
  ) { }
  productImg: string = '/assets/img/3.png';
  priceImg: string = '/assets/img/4.png';
  emptyCart: boolean = false;
  total: number = 0;
  products = [
    {
      "_id": "6036130ff81e09a56279e3e5",
      "details": "product2 details",
      "price": 195,
      "title": "product 2"
    },
    {
      "_id": "6036130ff81e09a56279e3e7",
      "details": "product details",
      "price": 125,
      "title": "product 1"
    },
    {
      "_id": "6036130ff81e09a56279e3e7",
      "details": "product details",
      "price": 125,
      "title": "product 3"
    }
  ]
  productIds = [];

  ngOnInit(): void {
    if (this.products.length == 0) this.emptyCart = true;
    //get Products for the user
    this.CartService.allProducts().subscribe((response) => {
      this.products = response;
    });

    this.products.forEach(element => {
      this.total += element.price;
    });

    this.products.forEach(element => {
      this.productIds.push(element._id);
    });
    //console.log(this.productIds)
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

  }

  //checkout products to order
  checkout() {
    console.log(this.productIds)

  }

}
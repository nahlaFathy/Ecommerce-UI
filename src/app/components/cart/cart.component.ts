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
  emptyCart: boolean = false;
  ngOnInit(): void {
    if (this.products.length == 0) this.emptyCart = true;
    //get Products for the user
    this.CartService.allProducts().subscribe((response) => {
    });

    this.products.forEach(element => {
      this.total += element.price;
    });
  }
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
  total: number = 0;

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
}

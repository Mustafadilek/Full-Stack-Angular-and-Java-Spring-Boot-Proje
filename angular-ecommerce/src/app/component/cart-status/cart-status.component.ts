import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {


  totalPrice=0.0;
  totalQuantity=0;

  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
   // subscribe to the cart totalPrice
   this.cartService.totalPrice.subscribe(
    data=> this.totalPrice=data
   );

   this.cartService.totalQuantity.subscribe(
    data=> this.totalQuantity=data
   )
  }

}

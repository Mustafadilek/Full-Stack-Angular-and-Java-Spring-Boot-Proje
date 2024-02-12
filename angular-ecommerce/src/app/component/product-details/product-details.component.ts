import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product!:Product;
  constructor(private productService: ProductService,
              private route:ActivatedRoute,
              private cartService: CartService) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const theProductId: number= +this.route.snapshot.paramMap.get("id")!;
    this.productService.getProduct(theProductId).subscribe(
      (      data: Product)=>{
        this.product=data;
      }
    )
  }

  addToCart(product:Product){
    const theCartItem= new CartItem(product);
    this.cartService.addToCart(theCartItem);




  }

}

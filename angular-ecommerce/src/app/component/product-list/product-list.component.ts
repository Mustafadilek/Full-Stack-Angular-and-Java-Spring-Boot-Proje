import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  
  products: Product[]=[];
  currentCategoryId:number=1;

  constructor(private productService: ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
    
  }

  listProducts(){

    // check if "id" paramter is available
    const hasCategory: boolean= this.route.snapshot.paramMap.has('id');

    if(hasCategory){
      // get the "id" param string. convert string to a number using the "+" syambol
        this.currentCategoryId= +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId=1;
    }

    this.productService.getProducList(this.currentCategoryId).subscribe(
      data=>{
        this.products=data;
      }
    );
  }



}

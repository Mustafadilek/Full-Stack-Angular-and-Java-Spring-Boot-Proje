import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private baseUrl= 'http://localhost:8090/api/products';
  private categoryUrl='http://localhost:8090/api/product-category'

  constructor(private httpclient: HttpClient) { }



  // Returns an observable. Map the JSON data from Spring Data to Product array
  getProducList(theCategoryId:number): Observable<Product[]>{

    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

    return this.httpclient.get<GetResponseProducts>(searchUrl).pipe(
      map(response=> response._embedded.products)
    );

  }
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpclient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=> response._embedded.productCategory)
    );
  }
}
interface GetResponseProducts{
  _embedded:{
    
      products:Product[];
    }

  }

  interface GetResponseProductCategory{
    _embedded:{
      
        productCategory:ProductCategory[];
      }
  
    }
  


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';
import{environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  
  private baseUrl= environment.luv2shopApiUrl + '/products';
  private categoryUrl=environment.luv2shopApiUrl + '/product-category'

  constructor(private httpclient: HttpClient) { }


  getProduct(theProductId: number): Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpclient.get<Product>(productUrl);
  
  }

  getProductListPaginate(thePage:number,
                        thePageSize:number,
                        theCategoryId:number): Observable<GetResponseProducts>{

    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                  + `&page=${thePage}&size=${thePageSize}`;

    return this.httpclient.get<GetResponseProducts>(searchUrl);

  }
  
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

  searchProducts(theKeyword: string) {
    const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    
    return this.httpclient.get<GetResponseProducts>(searchUrl).pipe(
      map(response=> response._embedded.products)
    );
  }

  searchProductsPaginate( thePage:number,
                          thePageSize:number,
                          theKeyword:string): Observable<GetResponseProducts>{

        const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                         + `&page=${thePage}&size=${thePageSize}`;

        return this.httpclient.get<GetResponseProducts>(searchUrl);

}
}
interface GetResponseProducts{
  _embedded:{
    
      products:Product[];
    },
  page:{
      size:number,
      totalElements:number,
      totalOPages:number,
      number:number
  }  

  }

  interface GetResponseProductCategory{
    _embedded:{
      
        productCategory:ProductCategory[];
      }
     
  
    }
  


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl= 'http://localhost:8090/api/products';

  constructor(private httpclient: HttpClient) { }



  // Returns an observable. Map the JSON data from Spring Data to Product array
  getProducList(): Observable<Product[]>{
    return this.httpclient.get<GetResponse>(this.baseUrl).pipe(
      map(response=> response._embedded.products)
    );

  }
}
interface GetResponse{
  _embedded:{
    
      products:Product[];
    }

  }


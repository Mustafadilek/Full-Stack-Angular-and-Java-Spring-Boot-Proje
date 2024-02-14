import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {of} from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl='http://localhost:8090/api/countries';
  private statesUrl='http://localhost:8090/api/states';


  constructor(private httpClient: HttpClient) { }

  getStates(theCountryCode:string): Observable<State[]>{

    const searchUrl= `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
      map(resonse=> resonse._embedded.states)
    );

  }
  getCountries():Observable<Country[]>{
   return  this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
    map(response=> response._embedded.countries)
   );
  }
  getCreditCardMonths(startMonth:number): Observable<number[]>{
    let data:number[]=[];

    // build an array for "Month" dropdown list
    // -start at desired startMonth and loop until 12
    
    
      for(let theMonth=startMonth; theMonth<=12; theMonth++){
        data.push(theMonth)
  
      }

   
   
    return of (data);


  }
  getCreditCardYears(): Observable<number[]>{
    let data:number[]=[];

    // build an array for "Month" dropdown list
    // -start at desired startMonth and loop until 12
    const startYear:number= new Date().getFullYear();
    const endYear: number= startYear+10;

    for(let theYear=startYear; theYear<=endYear; theYear++){
        data.push(theYear);
    }
    
    return of (data);  // wrapping an array as an Observable.

  }
}
interface GetResponseCountries{
  _embedded:{
    countries:Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states:State[];
  }
}
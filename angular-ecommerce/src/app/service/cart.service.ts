import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[]=[];

  // reference to web browser's session storage.
 // storage: Storage = sessionStorage;

  storage: Storage = localStorage;
 


  // Subject is a subclass of observable, we can use Subject to publis events in our code.
  // The event will be sent to all of the subscribers.
  totalPrice: Subject<number>= new BehaviorSubject<number>(0);
  totalQuantity: Subject<number>= new BehaviorSubject<number>(0);


  constructor() {

    // read data from storage, read json string and convert to obeject
   // read data from storage
   let data = JSON.parse(this.storage.getItem('cartItems')!);

   if (data != null) {
     this.cartItems = data;
     
     // compute totals based on the data that is read from storage
     this.computeCartTotals();
   }
   }

  
  addToCart(theCartItem:CartItem){
    
    // chaeck if we already have the item in our cart.
    let alreadyExistedInCart:boolean=false;
    let existingCartItem:CartItem=undefined;

    if(this.cartItems.length>0){

   //   for(let theItem of this.cartItems){
    //    if(theItem==theCartItem){
    //     existingCartItem=theItem;
    //      break;
    //   }
  
    //  }
      existingCartItem= this.cartItems.find(tempCartItem=> tempCartItem.id==theCartItem.id );

      alreadyExistedInCart=(existingCartItem!=undefined);
      
    }

    if(alreadyExistedInCart){

      existingCartItem.quantity++;

    }
    else{
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity.
    this.computeCartTotals();
    

  }
  computeCartTotals() {
    let totalPriceValue: number=0;
    let totalQuantityValue:number=0;

    for(let curretCartItem of this.cartItems){
    totalPriceValue+= (curretCartItem.quantity)*(curretCartItem.unitPrice);
    totalQuantityValue+=curretCartItem.quantity;

    }

    // publish the new values... all subscribers will recieve the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for just debugging.
    this.logCartData(totalPriceValue,totalQuantityValue);

    this.persistCartItems();

  }
  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
   }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of the cart');
    for(let curretCartItem of this.cartItems){
      const subTotalPrice= (curretCartItem.quantity)*(curretCartItem.unitPrice)
      console.log(`name: ${curretCartItem.name}, quantity=${curretCartItem.quantity}, unitPrice=${curretCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
      console.log(`totalPrice:${totalPriceValue}, totalQuantity:${totalQuantityValue}`);



    }

  }

  remove(theCartItem: CartItem)
  {
    const index= this.cartItems.findIndex(
      tempCartItem=> tempCartItem.id==theCartItem.id);
      if(index>-1){
        this.cartItems.splice(index,1);
        this.computeCartTotals();
      }
  }
  decrementQuantity(cart:CartItem){
  cart.quantity--;
  if(cart.quantity===0){
    this.remove(cart);
  }
  else{this.computeCartTotals();
  }
}
}

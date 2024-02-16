import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/service/cart.service';
import { Luv2ShopFormService } from 'src/app/service/luv2-shop-form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  checkoutFormGroup: FormGroup;

  totalPrice:number=0;
  totalQuantity:number=0;
  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  countries:Country[]=[];
  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];
  
  constructor( private formBuilder: FormBuilder,
               private luv2ShopFormService:Luv2ShopFormService,
               private cartService: CartService
               ) { }

             
              
  ngOnInit(): void {

    this.reviewCartDetails();
    
    this.checkoutFormGroup= this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,
                                       Validators.minLength(2),   
                                       CustomValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[ Validators.required,
                                      Validators.minLength(2),   
                                      CustomValidators.notOnlyWhitespace]),
        email:new FormControl('',
                              [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[ Validators.required,
                                     Validators.minLength(2),   
                                     CustomValidators.notOnlyWhitespace]),
        city: new FormControl('',[ Validators.required,
                                   Validators.minLength(2),   
                                   CustomValidators.notOnlyWhitespace]),
        state: new FormControl('',[ Validators.required]),
        country: new FormControl('',[ Validators.required]),
        zipCode: new FormControl('',[ Validators.required,
                                      Validators.minLength(2),   
                                      CustomValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',[ Validators.required,
                                     Validators.minLength(2),   
                                     CustomValidators.notOnlyWhitespace]),
        city: new FormControl('',[ Validators.required,
                                   Validators.minLength(2),   
                                   CustomValidators.notOnlyWhitespace]),
        state: new FormControl('',[ Validators.required]),
        country: new FormControl('',[ Validators.required]),
        zipCode: new FormControl('',[ Validators.required,
                                      Validators.minLength(2),   
                                      CustomValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[ Validators.required]),
        nameOnCard: new FormControl('',[ Validators.required,
                                         Validators.minLength(2),   
                                         CustomValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('',[ Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[ Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      }),
      
    });

    // populate countries
    this.luv2ShopFormService.getCountries().subscribe(
      data=>{
        console.log("Retrived countries: " +JSON.stringify(data));
        this.countries=data;
      }
    );

    // this.luv2ShopFormService.getStates()

    this.handleMonthsandYears();

    // populate credit card years
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data=>{
            console.log("Retrieved credit card years: "+JSON.stringify(data));
            this.creditCardYears=data;
      }
    )
   

  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}

  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameonCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value);

        // bug fix for states
        this.billingAddressStates=this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // bug fix for states
      this.billingAddressStates=[];
    }
   
    
  }

  onSubmit(){
    console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is "+ this.checkoutFormGroup.get('customer').value.email);
    console.log("The shipping address is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
  }
  handleMonthsandYears(){
    const creditCardFormGroup= this.checkoutFormGroup.get('creditCard');

    const currentYear:number=new Date().getFullYear();
    const selectedYear:number= Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;
    if(currentYear===selectedYear){
      startMonth= new Date().getMonth()+1;
    }
    else{
      startMonth=1;
    }
     // populate credit card months
     
     this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
       data=>{
             console.log("Retrieved credit card months: "+JSON.stringify(data));
             this.creditCardMonths=data;
       }
     )

  }

  getStates(formGroupName:string){

    const formGroup= this.checkoutFormGroup.get(formGroupName);
    const selectedCountryCode= formGroup.value.country.code;
    
    this.luv2ShopFormService.getStates(selectedCountryCode).subscribe(
      data=>{
        if(formGroupName==='shippingAddress'){
            this.shippingAddressStates=data;
          }
          else{
            this.billingAddressStates=data;
          }

          // select first item by default
          formGroup.get('state').setValue(data[0]);
      }
    )

  }
  reviewCartDetails(){

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity=> this.totalQuantity=totalQuantity
    );
    // subscribe to cartService.totalPrice

    this.cartService.totalPrice.subscribe(
      totalPrice=> this.totalPrice=totalPrice);

  }

 

}

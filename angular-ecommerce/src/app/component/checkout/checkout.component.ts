import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/service/luv2-shop-form.service';

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
               ) { }

             
              
  ngOnInit(): void {
    
    this.checkoutFormGroup= this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
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
 

}

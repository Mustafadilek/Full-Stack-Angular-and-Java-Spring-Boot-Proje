import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './service/product.service';
import { Routes, RouterModule } from '@angular/router';

import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { SearchComponent } from './component/search/search.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
 import{NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { LoginStatusComponent } from './component/login-status/login-status.component';
import{
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';

const oktaConfig= myAppConfig.oidc;

const oktaAuth= new OktaAuth(oktaConfig);

const routes: Routes=[ 
  {path:'login/callback', component:OktaCallbackComponent},
  {path:'login', component:LoginComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'cart-details', component:CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},

  {path: 'products', component: ProductListComponent},
  
  {path:'', redirectTo:'/products', pathMatch:'full'},
  {path: '**', redirectTo:'/products', pathMatch:'full'}
  
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService,{provide: OKTA_CONFIG, useValue:{oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

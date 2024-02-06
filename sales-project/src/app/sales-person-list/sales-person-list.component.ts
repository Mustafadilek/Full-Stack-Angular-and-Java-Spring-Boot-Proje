import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {
//create an array of objects

salesPersonlist:SalesPerson[]=[new SalesPerson("Mustafa","Dilek","mustafa@.test",1000),
new SalesPerson("Mete","Dilek","mete@.test",3000),
new SalesPerson("Ferhat","Seker","ferhat@.test",5000),
new SalesPerson("Eren","Deveci","eren@.test",9000)];

  constructor() { }

  ngOnInit(): void {
  }

}

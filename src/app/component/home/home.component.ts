import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';
import { Budget } from 'src/Budget';
import { Transaction } from 'src/Transaction';
import { Account } from 'src/Account';
import { stringToArray } from 'ag-grid-community';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  accounts: Account[] = [];
  budgets: Budget[] = [];

 public accName: string  = ""
 public accType: string = ""
 public accBal: number = 1
 public budgetName: string = ""
 public budgetTotal: number = 1
 public id: number = 1
 public trcType: string = ""
 public trcDest: string = ""
 public trcAmt: number = 1
 
 


constructor (public ui: UiService) {}

 
ngOnInit(): void {
  
}



}






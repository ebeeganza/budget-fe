import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';
import { Budget } from 'src/Budget';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  

 public bankAcc: string  = ""
 public bankType: string = ""
 public bankBal: number = 1
 public budgetName: string = ""
 public budgetTotal: number = 1
 public transDest: string = ""
 public transBudg: string = ""
 public transAmt: number = 1
 public allBudget: Budget[] = []


constructor (public ui: UiService) {}

 
ngOnInit(): void {
  
}
}






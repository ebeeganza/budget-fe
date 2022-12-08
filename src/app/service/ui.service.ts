import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Bank } from 'src/Bank';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Budget } from 'src/Budget';
import { Transaction } from 'src/Transaction';
import {MatSelectModule} from '@angular/material/select';


@Injectable({
  providedIn: 'root'
})
export class UiService {
  

  private bankAcc : string = ""
  private bankType : string = ""
  private bankBal : number = 1
  
  private budgetName : string = ""
  private budgetTotal : number = 1

  
  private transDest : string = ""
  private transBudg : string = ""
  private transAmt : number = 1
  

  public allBanks: Bank[] = []
  public allBudget: Budget[] = []
  public allTransaction: Transaction[] = []



  constructor(private http: HttpClient, private snackBar:MatSnackBar) { }

  public getbankAcc(): string  {
  return  this.bankAcc
  }

  public getbankType(): string  {
    return  this.bankType
    }

  public getbankBal(): number {
    return this.bankBal
  }

  public getbudgetName(): string  {
    return this.budgetName
  }

  public getbudgetTotal (): number {
    return this.budgetTotal
  }

  public gettransDest(): string {
    return this.transDest
  }

  public gettransBudg(): string {
    return this.transBudg
  }

  public gettransAmt(): number {
    return this.transAmt
  }

  
  public addBank(bankAcc:string, bankType:string, bankBal:number) {
      const bank = {id: Math.random(), bankAcc: bankAcc, bankType: bankType, bankBal: bankBal }
      console.log(bank)
       this.http.post<Bank>('http://localhost:3000/bank', bank) 
        .pipe(take(1))
        .subscribe ({
          next: () => { 
          this.newBank(bankAcc, bankType, bankBal)
          }
        })
  }

  public newBank (bankAcc:string, bankType:string, bankBal:number): void {
    this.bankAcc = bankAcc
    this.bankType = bankType
    this.bankBal = bankBal
  }

  public addBudget (budgetName:string, budgetTotal:number) {
    const budget = {id: Math.random(), budgetName: budgetName, budgetTotal: budgetTotal }
    console.log(budget)
     this.http.post<Budget>('http://localhost:3000/budget', budget) 
      .pipe(take(1))
      .subscribe ({
        next: () => { 
        this.newBudget(budgetName, budgetTotal)
        }
      })
  }

  public newBudget (budgetName:string, budgetTotal:number): void {
    this.budgetName = budgetName
    this.budgetTotal = budgetTotal
  }

  public addTrans(transDest:string, transBudg:string, transAmt:number) {
    const transaction = {id: Math.random(), transDest: transDest, transBudg: transBudg, transAmt: transAmt }
    console.log(transaction)
      this.http.post<Transaction>('http://localhost:3000/transaction', transaction) 
        .pipe(take(1))
        .subscribe ({
      next: () => { 
      this.newTrans(transDest, transBudg, transAmt)
      }
    })
  }

public newTrans (transDest: string, transBudg: string, transAmt: number): void {
  this.transDest = transDest
  this.transBudg = transBudg
  this.transAmt = transAmt
}

private showError (message:string): void {
  this.snackBar.open(message, undefined, {
    duration: 2000
  })
}

// to check if bank already exist
// public checkBankAcc (bankAcc:string, bankType:string, bankBal:number) {
//   this.http.get<Bank>(`http:/localhost:3000/bank?bankAcc=${bankAcc}&bankType=${bankType}&bankBal=${bankBal}`)
//       .pipe(take(1))
//       .subscribe ({
//         next: Bank => {
//           if(Bank.id > 0) {
//             this.showError('Account already exist')
//           }
//         }
//       })
//   this.newBank(bankAcc,bankType,bankBal)
  
// }



public getallBankAcc () {
  this.http.get<Bank[]>(`http:/localhost:3000/bank`)
      .pipe(take(1))
      .subscribe ({
        next: Bank => this.allBanks = Bank 
      })
}


public getallBudget () {
  this.http.get<Budget[]>(`http:/localhost:3000/budget`)
      .pipe(take(1))
      .subscribe ({
        next: Budget => this.allBudget = Budget 
      })
}

public getallTransaction () {
  this.http.get<Transaction[]>(`http:/localhost:3000/transaction`)
      .pipe(take(1))
      .subscribe ({
        next: Transaction => this.allTransaction = Transaction
      })
}



}

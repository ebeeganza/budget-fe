import { Injectable } from '@angular/core';
import { last, Subject, take } from 'rxjs';
import { Account } from 'src/Account';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Budget } from 'src/Budget';
import { Transaction } from 'src/Transaction';
import { MatGridTileFooterCssMatStyler } from '@angular/material/grid-list';



@Injectable({
  providedIn: 'root' 
})
export class UiService {
  

  private accName : string = ""
  private accType : string = ""
  private accBal : number = 1
  
  private budgetName : string = ""
  private budgetTotal : number = 1

  private trcType : string = ""
  private trcDest : string = ""
  private trcAmt : number = 1
  

  public allAccount: Account[] = []
  public allBudget: Budget[] = []
  public allTransaction: Transaction[] = []



  constructor(private http: HttpClient, private snackBar:MatSnackBar) { 
    if (this.trcType == "Income") {
          this.trcAmt > 0
    } else {this.trcAmt < 0}
  }

  public getAccName(): string  {
  return  this.accName
  }

  public getaccType(): string  {
    return  this.accType
    }

  public getaccBal(): number {
    return this.accBal
  }

  public getbudgetName(): string  {
    return this.budgetName
  }

  public getbudgetTotal (): number {
    return this.budgetTotal
  }

  public gettrcType(): string {
    return this.trcType
  }

  public gettrcDest(): string {
    return this.trcDest
  }

  public gettrcAmt(): number {
    return this.trcAmt
  }

  
  public addAcc(accName:string, accType:string, accBal:number): void {
      const account = {id: Math.random(), accName: accName, accType: accType, accBal: accBal }
      console.log(account)
       this.http.post<Account>('http://localhost:8080/account', account) 
        .pipe(take(1))
        .subscribe ({
          next: () => { 
          this.newAcct(accName, accType, accBal)
          }
        })
  }

  public newAcct (accName:string, accType:string, accBal:number): void {
    this.accName = accName
    this.accType = accType
    this.accBal = accBal
  }

  public addBudget (budgetName:string, budgetTotal:number) {
    const budget = {id: Math.random(), budgetName: budgetName, budgetTotal: budgetTotal }
    console.log(budget)
     this.http.post<Budget>('http://localhost:8080/budget', budget) 
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

  public addTrc(trcType:string, trcDest:string, trcAmt:number) {
    const transaction = {id: Math.random(), trcType: trcType, trcDest: trcDest, trcAmt: trcAmt }
    console.log(transaction)
      this.http.post<Transaction>('http://localhost:8080/transaction', transaction) 
        .pipe(take(1))
        .subscribe ({
          next: () => { 
          this.newTrc(trcType, trcDest, trcAmt)
      }
    })
  }

public newTrc ( trcType: string, trcDest: string, trcAmt: number): void {
  this.trcType = trcType  
  this.trcDest = trcDest
  this.trcAmt = trcAmt
}



public getallAccount () {
  this.http.get<Account[]>(`http:/localhost:8080/bank`)
      .pipe(take(1))
      .subscribe ({
        next: Bank => this.allAccount = Bank 
      })
}


public getallBudget () {
  this.http.get<Budget[]>(`http:/localhost:8080/budget`)
      .pipe(take(1))
      .subscribe ({
        next: Budget => this.allBudget = Budget
      })
}

public getallTransaction () {
  this.http.get<Transaction[]>(`http:/localhost:8080/transaction`)
      .pipe(take(1))
      .subscribe ({
        next: Transaction => this.allTransaction = Transaction
      })
}

public deleteTrc(id: number): void {
  this.http.delete('http://localhost:8080/transaction/${id}')
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.addTrc(this.trcType, this.trcDest, this.trcAmt)
        },
      error: () => {
        this.showError('Oops, something went wrong')
      }
    })
}

private showError (message:string): void {
  this.snackBar.open(message, undefined, {
    duration: 2000
  })
}

public accTrc(transaction: Transaction): void {
  this.http.put('http://localhost:8080/transaction/${transaction.id}', {
    trcType: transaction.trcType,
    trcDest: this.accName,
    trcAmt: transaction.trcAmt
  })
  .pipe(take(1))
  .subscribe({
    next: () => {
      this.addTrc
    },
    error: () => {
      this.showError('No change to account')
    }
  })
}


public budTrc(transaction: Transaction): void {
  this.http.put('http://localhost:8080/transaction/${transaction.id}', {
    trcType: transaction.trcType,
    trcDest: this.budgetName,
    trcAmt: transaction.trcAmt
  })
  .pipe(take(1))
  .subscribe({
    next: () => {
      this.addTrc
    },
    error: () => {
      this.showError('No change to budget')
    }
  })
}




// public crdTrc () {
//   this.newAcct.accBal + this.newTrc.trcAmt
//   newAcc[2] + this.newTrc[0]
// }

// public dbtTrc (trcType: string, trcDest: string, trcSrc: string, trcAmt: number) {
    // if (this.trcType == "income") { this.trcAmt > 0};
    // if (this.trcType == "income") { this.trcDest == "deposit"};
    // this.getaccBal() - this.trcAmt;

//   this.budgetTotal - this.trcAmt;
//   this.getaccBal() - this.trcAmt
// }

// public doTrc (trcType: string, trcDest: string, trcAmt: number) {
//   this.addTrc
//   this.crdTrc
//   this.dbtTrc
// }


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







}

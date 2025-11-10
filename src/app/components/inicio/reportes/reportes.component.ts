import { Component, OnInit } from '@angular/core';
import{ Transactions } from '../../../models/transactions';
import { SubscribeService } from '../../../services/subscribe.service'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  listTransactions: Transactions[];


  constructor(private subscribeService: SubscribeService)
  {
    
  }

  ngOnInit(): void {
    this.getTransactions('2025-11-10');
  }

  getTransactions(date:string ):void{
    this.subscribeService.listTransactions(date).subscribe(data=>{
        this.listTransactions = data.transactions;
        console.log(data);  
        console.log(data.status);  
        console.log(this.listTransactions); 
    },
    (error) => {
      console.error('Error al obtener los datos', error);
    });
  }

}

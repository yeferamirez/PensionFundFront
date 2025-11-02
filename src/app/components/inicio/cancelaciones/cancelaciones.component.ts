import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service'
import { error } from '@angular/compiler/src/util';
import { UnSubscribe } from 'src/app/models/unSubscribe';
import{ Transactions } from '../../../models/transactions';
import { SubscribeService } from 'src/app/services/subscribe.service'
import{ FundConfiguration } from '../../../models/fundConfiguration';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cancelaciones',
  templateUrl: './cancelaciones.component.html',
  styleUrls: ['./cancelaciones.component.css']
})
export class CancelacionesComponent implements OnInit {
  unSubscribe: FormGroup;
  listFundConfigurations: FundConfiguration[];
  selectedItemProduct: any;
  selectedItemtype: any;

  constructor(private fb:  FormBuilder, private toastr: ToastrService, private router: Router, 
      private unSubscribeService: UnsubscribeService, private subscribeService: SubscribeService) {
    this.unSubscribe = this.fb.group({
      clientName: ['', Validators.required],
      clientLastName: ['', Validators.required],
      productCity: ['', Validators.required],
      dropdown: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.getFundConfigurations();
  }

  getFundConfigurations():void{    
    this.subscribeService.getFundConfigurations().subscribe(data => {
      this.listFundConfigurations = data.fundConfigurations;
      console.log(data.status);  
      console.log(this.listFundConfigurations);    
    },
    (error) => {
      console.error('Error al obtener los datos', error);
    });    
  }
  onSelectProduct(item: string): void {
    this.selectedItemProduct = item;
    const selectedProduct = this.listFundConfigurations.find(x=>x.fundName == this.selectedItemProduct);
    if (selectedProduct) {
      this.selectedItemtype = selectedProduct.category;
    }
    console.log('Elemento seleccionado:', this.selectedItemProduct);
  }

  unSubscriber():void {
    console.log(this.unSubscribe);
    const unSubscribeFund: UnSubscribe = {
      clientName: this.unSubscribe.value.clientName,
      clientLastName: this.unSubscribe.value.clientLastName,
      city: this.unSubscribe.value.productCity,
      productName: this.selectedItemProduct,
      productType: this.selectedItemtype
    }
    this.unSubscribeService.unSubscribeFund(unSubscribeFund).subscribe(data=> {
      this.toastr.success('El cliente '+ data.transaction.clientName +' fue subscrito con exito!!!', data.status);      
      this.router.navigate(['/bienvenidos']); 
    }, error => {      
      this.toastr.error(error.error.message , error.error.status); 
      this.unSubscribe.reset();   
    });    
  }  
}

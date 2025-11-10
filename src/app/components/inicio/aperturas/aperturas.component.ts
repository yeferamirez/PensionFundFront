import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Subscribe} from '../../../models/subscribe';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SubscribeService } from 'src/app/services/subscribe.service'
import { error } from '@angular/compiler/src/util';
import{ FundConfiguration } from '../../../models/fundConfiguration';

@Component({
  selector: 'app-aperturas',
  templateUrl: './aperturas.component.html',
  styleUrls: ['./aperturas.component.css']
})
export class AperturasComponent implements OnInit {
  subscribe: FormGroup;
  listFundConfigurations: FundConfiguration[];
  selectedItemProduct: string;
  selectedItemtype: any;
  selectedValue: any;
  selectedNotificationType: any;
  isSpanVisible: boolean = false;

  constructor(private fb:  FormBuilder, private toastr: ToastrService, 
      private router: Router, private subscribeService: SubscribeService) {
    this.subscribe = this.fb.group({
      clientName: ['', Validators.required],
      clientLastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      productCity: ['', Validators.required],
      dropdown: ['', Validators.required],
      radioOption: ['', Validators.required],
      value: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.getFundConfigurations();
  }

  getFundConfigurations():void{    
    this.subscribeService.getFundConfigurations().subscribe(data => {
      this.listFundConfigurations = data;
      console.log(this.listFundConfigurations);    
    },
    (error) => {
      console.error('Error al obtener los datos', error);
    });    
  }

  onSelectProduct(item: string): void {
    this.selectedItemProduct = item;
    const selectedProduct = this.listFundConfigurations.find(x=>x.name == this.selectedItemProduct);
    if (selectedProduct) {
      this.selectedItemtype = selectedProduct.type;
      this.selectedValue = selectedProduct.minimumCost ?? 0;
      this.isSpanVisible = !!this.selectedValue;
    }
  }

  subscriber():void {
    const subscribeFund: Subscribe = {
      clientName: this.subscribe.value.clientName,
      clientLastName: this.subscribe.value.clientLastName,
      productCity: this.subscribe.value.productCity,
      email: this.subscribe.value.email,
      phoneNumber: this.subscribe.value.phoneNumber,
      notificationType: this.selectedNotificationType,
      productName: this.selectedItemProduct,
      productType: this.selectedItemtype,
      value: this.subscribe.value.value
    }    
    
    console.log(subscribeFund);
    this.subscribeService.subscribeFund(subscribeFund).subscribe(data=> {
      this.toastr.success('El cliente '+ data.clientName +' fue subscrito con exito!!!', data.status);      
      this.router.navigate(['/inicio/bienvenidos']); 
    }, error => {      
      this.toastr.error(error.error.detail , error.error.status);
      this.subscribe.reset();   
    });    
  }  
}

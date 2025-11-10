import { Injectable } from '@angular/core';
import { Subscribe } from '../models/subscribe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  myAppUrl: string;
  myApiUrl: string;
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/v1/PensionFund/'
   }

  subscribeFund(subscribe: Subscribe): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + 'subscribe-fund', subscribe);
  }

  listTransactions(date: string): Observable<any> 
  {
    const url = this.myAppUrl + this.myApiUrl + 'list-transactions?date='+ date
    return this.http.get(url);
  }

  getFundConfigurations(): Observable<any> 
  {
    const url = this.myAppUrl + this.myApiUrl + 'get-fundconfiguration'
    return this.http.get(url);
  }
}

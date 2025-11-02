import { Injectable } from '@angular/core';
import { UnSubscribe } from '../models/unSubscribe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService {
  myAppUrl: string;
  myApiUrl: string;
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/PensionFund/unsubscribe-fund';
   }

  unSubscribeFund(unSubscribe: UnSubscribe): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, unSubscribe);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  addStock(stock : Stock) {
    return this.httpClient.post(environment.stockUrl+"/add/"+stock.companyCode, stock);
  }

  viewStock(companyCodeIn: number, startDateIn: Date, endDateIn: Date) {
    console.log(`calling stock api -- get`);
    console.log(companyCodeIn);
    console.log(startDateIn);
    console.log(endDateIn);
    return this.httpClient.get(environment.stockUrl+"/get/"+companyCodeIn+"/"+startDateIn+"/"+endDateIn);
  }

  constructor(private httpClient: HttpClient) { }
}

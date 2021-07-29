import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FinalResult } from '../model/finalResult';
import { Stock } from '../model/stock';
import { StockServiceService } from '../service/stock-service.service';

@Component({
  selector: 'app-get-stock-details',
  templateUrl: './get-stock-details.component.html',
  styleUrls: ['./get-stock-details.component.scss']
})
export class GetStockDetailsComponent implements OnInit {

  stock: Stock;
  stockForm: FormGroup;
  companyCodeIn: string;
  companyCodeOut: string;
  startDateIn: Date;
  endDateIn: Date;
  stocks: any;
  isPresent = false;
  constructor(private stockService: StockServiceService) {
    this.companyCodeIn = '';
    this.companyCodeOut = '';
    this.startDateIn =  new Date();
    this.endDateIn =  new Date();
    this.stocks = new FinalResult();
    this.isPresent = false;
   }

  ngOnInit() {
    this.stockForm = new FormGroup({
      companyCode : new FormControl('', [Validators.required]),
      from : new FormControl(new Date(), [Validators.required]),
      to : new FormControl(new Date(),  [Validators.required])
    });

    }

  viewStocks(stockForm) {
    this.companyCodeIn = stockForm.value.companyCode;
    this.startDateIn = stockForm.value.from;
    this.endDateIn = stockForm.value.to;
    this.stockService.viewStock(this.companyCodeIn, this.startDateIn.toISOString().substring(0, 10), this.endDateIn.toISOString().substring(0, 10)).subscribe(
      data => {
        console.log('api call success', data);
        this.isPresent = true;
        this.companyCodeOut = this.companyCodeIn;
        this.stocks = data;
      },
      err => {
        console.log('api call failed', err);
        alert(err.error.message);
      }
    );

  }
}

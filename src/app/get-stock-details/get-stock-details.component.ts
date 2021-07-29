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
  companyCodeIn: number;
  companyCodeOut: number;
  startDateIn: Date;
  endDateIn: Date;
  stocks: any;
  isPresent = false;
  constructor(private stockService: StockServiceService) {
    this.companyCodeIn = 0;
    this.companyCodeOut = 0;
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

    // get companyCode() {
    //   return this.stockForm.get('companyCode');
    // }

    // set companyCode(fmCompanyCode: any) {
    //   this.stockForm.setValue({
    //     companyCode: fmCompanyCode.value
    //   });
    // }

    // get startDate() {
    //   return this.stockForm.get('from');
    // }

    // set startDate(fmStartDate: any) {
    //   this.stockForm.setValue({
    //     startDate: fmStartDate.value
    //   });
    // }

    // get endDate() {
    //   return this.stockForm.get('to');
    // }

    // set endDate(fmEndDate: any) {
    //   this.stockForm.setValue({
    //     endDate: fmEndDate.value
    //   });
    // }

  viewStocks(stockForm) {
    console.log('StockForm', stockForm);
    console.log('viewSTock ', this.companyCodeIn);
    console.log('viewSTock ', this.startDateIn);
    console.log('viewSTock ', this.endDateIn);
    this.stockService.viewStock(this.companyCodeIn, this.startDateIn, this.endDateIn).subscribe(
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

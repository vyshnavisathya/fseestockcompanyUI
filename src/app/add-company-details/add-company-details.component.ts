import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../model/company';
import { CompanyServiceService } from '../service/company-service.service';

@Component({
  selector: 'app-add-company-details',
  templateUrl: './add-company-details.component.html',
  styleUrls: ['./add-company-details.component.scss']
})
export class AddCompanyDetailsComponent implements OnInit {

  company: Company;
  companyForm: FormGroup;
  constructor(private companyService: CompanyServiceService) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      companyCode : new FormControl('', [Validators.required]),
      companyName : new FormControl('', [Validators.required]),
      companyCeo  : new FormControl('', [Validators.required]),
      companyTurnOver : new FormControl('', [Validators.required]),
      companyWebsite : new FormControl('', [Validators.required]),
      stockExchange : new FormControl('', [Validators.required])
    });
  }

  send(companyForm) {
    console.log('company ', companyForm.value);
    this.companyService.addCompany(companyForm.value).subscribe(
      data => {
       companyForm.reset();
      }, err  => {
        alert('API call failed:(');
      }
    );

  }

  resetForm(companyForm ) {
    companyForm.reset();
  }

}

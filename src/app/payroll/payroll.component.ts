import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  wsError = "";
  fullName;
  emailAddress;
  phoneNo;
  dayRate;
  yourEnquiry;
  usuallyWorkUK;
  usuallyWorkInternational;
  contactYou;
  formPage = true;
  usuallyWorkArray = [];
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  // usuallyWorkChange(value) {
  // 	this.usuallyWorkArray = this.usuallyWorkUK == true ? value : '';
  // }

  requestAFreeIllustration() {
   console.log("usuallyWork", this.usuallyWorkUK);
   if(!this.fullName) {
   	alert("Name Field Required !")
   }
   if(!this.emailAddress && this.fullName) {
   	alert("Email Address Field Required !")
   }
   if(this.emailAddress && this.fullName && !this.phoneNo) {
   	alert("Phone No Field Required !")
   }
   if(this.emailAddress && this.fullName && this.phoneNo && !this.dayRate) {
   	alert("Day Rate Field Required !")
   }
   if(this.emailAddress && this.fullName && this.phoneNo && this.dayRate && !this.yourEnquiry) {
   	alert("Your Requirment Details Field Required !")
   }
    this.wsError = "";
   var input = {
    "name":this.fullName,
	"email":this.emailAddress,
	"phone":this.phoneNo,
	"dayrate":this.dayRate,
	"about_inquery_box":this.yourEnquiry,
	"whare_do_you_work":"uk",
	"contact_time":"am",
	"smode":"page"

   };
   console.log("input--", input);
   if(this.emailAddress && this.fullName && this.phoneNo && this.dayRate && this.yourEnquiry) {
	   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/payrole";
	       this._commonRequestService.postData(wsUrl,input).subscribe(
	        data => {
	         console.log("share profile data", data);
	         if(data && data.status === "TRUE") {
	           this.wsError = "";
	           this.formPage = false;
	          } else {
	            if(data && data.status === "FALSE") {
	            	this.formPage = true;
	              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
	            }
	          }
	        }
	    );
	}
  }

}

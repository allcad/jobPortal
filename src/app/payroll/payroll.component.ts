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
  contactYouAm;
  contactYouPm;
  formPage = true;
  usuallyWorkArray = [];
  contactYouArray = [];
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  usuallyUKWorkChange() {
    //this.usuallyWorkArray = this.commonFunction(this.usuallyWorkUK, this.usuallyWorkArray, 'uk')
  	if(this.usuallyWorkUK) {
      this.usuallyWorkArray.push('uk')
    } else {
      if(this.usuallyWorkArray.length > 0 && this.usuallyWorkArray.indexOf('uk') > -1) {
        let index = this.usuallyWorkArray.indexOf('uk');
        this.usuallyWorkArray.splice(index, 1)
      }
    }
    console.log("this.usuallyWorkArray uk", this.usuallyWorkArray.toString());
  }

  usuallyInterWorkChange() {
    //this.usuallyWorkArray = this.commonFunction(this.usuallyWorkInternational, this.usuallyWorkArray, 'international');
    if(this.usuallyWorkInternational) {
      this.usuallyWorkArray.push('international')
    } else {
      if(this.usuallyWorkArray.length > 0 && this.usuallyWorkArray.indexOf('international') > -1) {
        let index1 = this.usuallyWorkArray.indexOf('international');
        this.usuallyWorkArray.splice(index1, 1)
      }
    }
     console.log("this.usuallyWorkArray inter", this.usuallyWorkArray);
  }

  contactYouAmChange() {
    //this.contactYouArray = this.commonFunction(this.contactYouAm, this.contactYouArray, 'am');
    if(this.contactYouAm) {
      this.contactYouArray.push('am')
    } else {
      if(this.contactYouArray.length > 0 && this.contactYouArray.indexOf('am') > -1) {
        let index1 = this.contactYouArray.indexOf('am');
        this.contactYouArray.splice(index1, 1)
      }
    }
     console.log("this.contactYouArray am", this.contactYouArray);
  }

  contactYouPmChange() {
    //this.contactYouArray = this.commonFunction(this.contactYouPm, this.contactYouArray, 'pm')
    if(this.contactYouPm) {
      this.contactYouArray.push('pm')
    } else {
      if(this.contactYouArray.length > 0 && this.contactYouArray.indexOf('pm') > -1) {
        let index1 = this.contactYouArray.indexOf('pm');
        this.contactYouArray.splice(index1, 1)
      }
    }
     console.log("this.usuallyWorkArray pm", this.contactYouArray);
  }

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
   if(this.emailAddress && this.fullName && this.phoneNo && this.dayRate && this.yourEnquiry && this.usuallyWorkArray.length == 0) {
     alert("Select atleast one work location !")
   }
   if(this.emailAddress && this.fullName && this.phoneNo && this.dayRate && this.yourEnquiry && this.usuallyWorkArray.length > 0 && this.contactYouArray.length == 0) {
     alert("Select atleast one time of call !")
   }
    this.wsError = "";
   var input = {
    "name":this.fullName,
	"email":this.emailAddress,
	"phone":this.phoneNo,
	"dayrate":this.dayRate,
	"about_inquery_box":this.yourEnquiry,
	"whare_do_you_work":this.usuallyWorkArray && this.usuallyWorkArray.length > 0 ? this.usuallyWorkArray.toString() : '',
	"contact_time": this.contactYouArray && this.contactYouArray.length > 0 ? this.contactYouArray.toString() : '',
	"smode":"page"

   };
   console.log("input--", input);
   if(this.emailAddress && this.fullName && this.phoneNo && this.dayRate && this.yourEnquiry && this.usuallyWorkArray.length > 0 && this.contactYouArray.length > 0) {
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

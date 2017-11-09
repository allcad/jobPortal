import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-manage-account',
  templateUrl: './recruiter-manage-account.component.html',
  styleUrls: ['./recruiter-manage-account.component.css']
})
export class RecruiterManageAccountComponent implements OnInit {
  name: string;
  jobTitle: string;
  telePhone: number;
  nameFlag = false;
  jobTitleFlag = false;
  telephoneFlag = false;
  allErrorFlag = false;

  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.recruiterAccountDetails();
  }

  recruiterAccountDetails() {
     var input = {
     "email":"test@test7.com",
  "loginToken":":$2y$10$AUQhfigHBiNAzCG9aSYZe.WEbqDIBNVxl6aBoSHJs8.oEuPFWMkHm"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/account";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("recruiter account--", data);
         if(data && data.data) {
           this.name = data.data.personalDetails && data.data.personalDetails.name ? data.data.personalDetails.name : "";
           this.jobTitle = data.data.personalDetails && data.data.personalDetails.jobTitle ? data.data.personalDetails.jobTitle : "";
           this.telePhone = data.data.contactDetails && data.data.contactDetails.telephone ? data.data.contactDetails.telephone : "";
         }
        }
    );
  }

  saveRecruiterAccountForm(form: NgForm) {

    if(this.name) {
      this.nameFlag = false;
    } else {
      this.nameFlag = true;
    }

    if(this.jobTitle) {
      this.jobTitleFlag = false;
    } else {
      this.jobTitleFlag = true;
    }

    if(this.telePhone) {
      this.telephoneFlag = false;
    } else {
      this.telephoneFlag = true;
    }

    if(this.nameFlag || this.jobTitleFlag || this.telephoneFlag) {
      this.allErrorFlag = true;
    } else {
      this.allErrorFlag = false;
    }

    if(!this.allErrorFlag) {
    	var recruiterAccountJson = {
  		personalDetails: {
  			'name': this.name,
  			'jobTitle': this.jobTitle
  		},
  		contactDetails: {
  			'telephone': this.telePhone
  		}
  	}
  	console.log("recruiterAccountJson--", recruiterAccountJson);
    }
  }

}

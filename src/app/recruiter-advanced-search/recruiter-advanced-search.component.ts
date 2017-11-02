import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-advanced-search',
  templateUrl: './recruiter-advanced-search.component.html',
  styleUrls: ['./recruiter-advanced-search.component.css']
})
export class RecruiterAdvancedSearchComponent implements OnInit {
jobTitle: string;
keyWordSearch;
stemmedTermsCheck = false;
coreSkills:string;
certifications: string;
dontShowContractor: any;
cityTown;
preferredMinRate: number;
preferredMaxRate: number;
dailyHourlyRate;
timeLeft = 0;
includeContractor = false;
showContractor = 0;
contractorName: string;
contractorEducation;
drivingLicence;
mappingFlag = true;
radialFlag = false;
securityClearanceArray;
industryArrayData;

  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getSecurityClearance();
    this.getIndustry();
  }

  getSecurityClearance() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/security_clearance";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("securityClearanceArray--", data);
          this.securityClearanceArray = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getIndustry() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("industryArrayData--", data);
          this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getRangeSliderValue(e) {
  	
  }

  mappingClick() {
  	this.mappingFlag = true;
  	this.radialFlag = false;
  }

  radialClick() {
  	this.radialFlag = true;
  	this.mappingFlag = false;
  }

  resetSearch() {
  	this.jobTitle = "";
	this.keyWordSearch = "";
	this.stemmedTermsCheck = false;
	this.coreSkills = "";
	this.certifications = "";
	this.dontShowContractor = ""
	this.cityTown = "";
	this.preferredMinRate = 0;
	this.preferredMaxRate = 0;
	this.dailyHourlyRate = '';
	this.timeLeft = 0;
	this.includeContractor = false;
	this.showContractor = 0;
	this.contractorName = "";
	this.contractorEducation = "";
	this.drivingLicence = '';
  }

}

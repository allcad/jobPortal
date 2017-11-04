import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-saved-search',
  templateUrl: './recruiter-saved-search.component.html',
  styleUrls: ['./recruiter-saved-search.component.css']
})
export class RecruiterSavedSearchComponent implements OnInit {
  savedSearchName: string;
  addToWatchDogCheck= false;
  jobTitle: string;
  keywordSearch;
  stemmedTerms = false;
  coreSkills;
  certificationValues;
  dontShowContractor;
  cityTownValue;
  includeRelocators = false;
  minRate: number;
  maxRate: number;
  dailyHourlyValue;
  timeLeftOnCutCont;
  includeUnavailable = false;
  showContractors;
  contractorName;
  educationValue;
  drivingLicenceValue;
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

  saveSearch() {
  	var savedSearchSaveJson = {
  		'savedSearchName': this.savedSearchName,
  		'addToWatchDogCheck': this.addToWatchDogCheck,
  		'jobTitle': this.jobTitle,
  		'keywordSearch': this.keywordSearch,
  		'stemmedTerms': this.stemmedTerms,
  		'coreSkills': this.coreSkills,
  		'certificationValues': this.certificationValues,
  		'dontShowContractor': this.dontShowContractor,
  		'cityTownValue': this.cityTownValue,
  		'includeRelocators': this.includeRelocators,
  		'minRate': this.minRate,
  		'maxRate': this.maxRate,
  		'dailyHourlyValue': this.dailyHourlyValue,
        'timeLeftId': this.timeLeftOnCutCont,
  		'includeUnavailable': this.includeUnavailable,
  		'showContractorsId': this.showContractors,
  		'contractorName': this.contractorName,
  		'educationId': this.educationValue,
  		'industrySectorId': 1,
  		'securityId': 1,
  		'drivingLicenceValue': this.drivingLicenceValue
  	}
  }

}

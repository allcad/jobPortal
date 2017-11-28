import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';

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
currentLocation;
timeLeftData;
sortByData;
industrySectorValue;
securityClearValue;

  constructor(public _commonRequestService: CommonRequestService, private activateRoute: ActivatedRoute,
    private _route: Router, private commonService: CommonService) {
    console.log("activateRoute", _route.url);
   }

  ngOnInit() {
    this.getSecurityClearance();
    this.getIndustry();
    this.getTimeLeftData();
    this.getSortByData();
  }

  getTimeLeftData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/time_slot";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
          console.log("timeLeftData--", data);
          this.timeLeftData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  // getSortByData() {
  //    var input = {
  //    "email":"test@test7.com",
  //   "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

  //  };
  //  console.log("input--", input);
  //  var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by";
  //      this._commonRequestService.getData(wsUrl).subscribe(
  //       data => {
  //         console.log("sort by--", data);
  //         this.sortByData = data.data;
  //         //this.recruiterNameArray = data.data;
  //       }
  //   );
  // }

  getSortByData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by_recruiter_search";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
          console.log("sort by--", data);
          this.sortByData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
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

  lastSearchClick() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/last_search";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("last search data--", data);
          if(data && data.data && data.status == 'TRUE') {
            this.commonService.setLastSearchData(data.data);
          }
          if(this._route.url == "/public/advanced-search") {
            this._route.navigate(['/public/saved-search']);
          } else if(this._route.url == "/recruiter/advanced-search") {
            this._route.navigate(['/recruiter/saved-search']);
          } 
          //this.securityClearanceArray = data.data;
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
  this.currentLocation = '';
  this.industrySectorValue = [];
  this.securityClearValue = [];
  }

  saveAdvanceSearch() {
    var saveJson = {
      'jobTitle': this.jobTitle,
      'keywords': this.keyWordSearch,
      'stemmedTerms': this.stemmedTermsCheck,
      'coreSkills': this.coreSkills,
      'certification': this.certifications,
      'dontShowContractor': this.dontShowContractor,
      'cityTown': this.cityTown,
      'currentLocation': this.currentLocation,
      'distanceFrom': '',
      'minRate': this.preferredMinRate,
      'maxRate': this.preferredMaxRate,
      'dailyHourlyRate': this.dailyHourlyRate,
      'timeLeft': this.timeLeft,
      'includeContractor': this.includeContractor,
      'showContractor': this.showContractor,
      'contractorName': this.contractorName,
      'education': this.contractorEducation,
      'industrySector': this.industrySectorValue,
      'securityClearance': this.securityClearValue,
      'drivingLicence': this.drivingLicence
    }

    var savedSearchSaveJson = {
      "email":"test@test8.com",
      "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      // "recuriter_saved_search_name":this.savedSearchName,
      // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
      "recuriter_search_job_title":this.jobTitle?this.jobTitle:'',
      "recuriter_search_keywords":this.keyWordSearch ?this.keyWordSearch :'',
      "recuriter_search_stemmed_terms":this.stemmedTermsCheck === true ? 1 : 0,
      "recuriter_search_core_skills":this.coreSkills ? this.coreSkills :'',
      "recuriter_search_certifications":this.certifications ? this.certifications : '',
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor ? this.dontShowContractor : '',
      "recuriter_search_location":this.cityTown ? this.cityTown : '',
      "recuriter_search_include_relocators":this.includeContractor ? 1 : 0,
      "recuriter_search_by_rate_min":this.preferredMinRate ? this.preferredMinRate : '',
      "recuriter_search_by_rate_max":this.preferredMaxRate ? this.preferredMaxRate : '',
      "recuriter_search_by_rate_type":this.dailyHourlyRate ? this.dailyHourlyRate : '',
      "recuriter_search_by_time_left":this.timeLeft ? this.timeLeft : '',
      "recuriter_search_by_unavailable":1,
      "recuriter_search_by_updated_contractor_since":this.showContractor ? this.showContractor : '',
      "recuriter_search_by_contract_name":this.contractorName?this.contractorName:'',
      "recuriter_search_by_education":this.contractorEducation ? this.contractorEducation : "",
      "recuriter_search_by_industry":JSON.stringify(this.industrySectorValue) ? JSON.stringify(this.industrySectorValue)   : "",
      "recuriter_search_by_security_clearance":JSON.stringify(this.securityClearValue) ? JSON.stringify(this.securityClearValue) :  "",
      "recuriter_search_by_driving_license":this.drivingLicence == 'yes' ? 1 : 0,
      "page":1,
      "limit":10,
      "sort":8
    }

    //this._commonDataShareService.advancedSerahcResult.next(savedSearchSaveJson);
    this.commonService.setSearchResult(savedSearchSaveJson);
    //this._route.navigate(['/recruiter/searchresult-loggedin']);
    if(this._route.url == "/public/advanced-search") {
      this._route.navigate(['/public/searchresult-loggedin']);
    } else if(this._route.url == "/recruiter/advanced-search") {
      this._route.navigate(['/recruiter/searchresult-loggedin']);
    } 


  }

}

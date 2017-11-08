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
  minRate;
  maxRate;
  dailyHourlyValue;
  timeLeftOnCutCont;
  includeUnavailable = false;
  showContractors;
  contractorName;
  educationValue = "";
  drivingLicenceValue;
  securityClearanceArray;
  industryArrayData;
  timeLeftData;
  educationData;
  succesMessageFlag = false;
  responseData;
  searchListData;
  recentRecruiterSaveId;
  searchListDataFlag = false;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getSecurityClearance();
    this.getIndustry();
    this.getTimeLeftData();
    this.getEducationData();
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

  getEducationData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/education_level";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
          console.log("education data--", data);
          this.educationData = data.data;
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

  saveSearchDelete() {
     var input = {
     "email": "johnsmith21@gmail.com",
      "loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
      "contractor_search_id":this.recentRecruiterSaveId
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("delete data--", data);
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getSaveSearchDetails(id) {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "contractor_search_id":id
   };
   this.recentRecruiterSaveId = id;
   console.log("this.recentRecruiterSaveId--", this.recentRecruiterSaveId)
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/detail ";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("save search details--", data);
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getSaveSearchList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("list save search--", data);
          if(data && data.data && data.data.length > 0) {
            this.searchListDataFlag = true;
            this.searchListData = data.data;
          }
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  resetFields() {
    this.savedSearchName = "";
    this.addToWatchDogCheck = false;
    this.jobTitle = "";
    this.keywordSearch = "";
    this.stemmedTerms = false;
    this.coreSkills = "";
    this.certificationValues = "";
    this.dontShowContractor = "";
    this.cityTownValue = "";
    this.includeRelocators = false;
    this.minRate = "";
    this.maxRate = "";
    this.dailyHourlyValue = "";
    this.timeLeftOnCutCont = "";
    this.includeUnavailable = false;
    this.showContractors = "";
    this.contractorName = "";
    this.educationValue = "";
    this.drivingLicenceValue = "";
  }

  saveSearch() {
    var savedSearchSaveJson = {
      "email":"test@test8.com",
      "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      "recuriter_saved_search_name":this.savedSearchName,
      "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
      "recuriter_search_job_title":this.jobTitle,
      "recuriter_search_keywords":this.keywordSearch,
      "recuriter_search_stemmed_terms":this.stemmedTerms === true ? 1 : 2,
      "recuriter_search_core_skills":this.coreSkills,
      "recuriter_search_certifications":this.certificationValues,
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor,
      "recuriter_search_location":this.cityTownValue,
      "recuriter_search_include_relocators":this.includeRelocators ? 1 : 2,
      "recuriter_search_by_rate_min":this.minRate,
      "recuriter_search_by_rate_max":this.maxRate,
      "recuriter_search_by_rate_type":this.dailyHourlyValue,
      "recuriter_search_by_time_left":this.timeLeftOnCutCont,
      "recuriter_search_by_unavailable":this.includeUnavailable ? 1 : 2,
      "recuriter_search_by_updated_contractor_since":this.showContractors,
      "recuriter_search_by_contract_name":this.contractorName,
      "recuriter_search_by_education":this.educationValue,
      "recuriter_search_by_industry":["1", "2"],
      "recuriter_search_by_security_clearance":["1", "2"],
      "recuriter_search_by_driving_license":this.drivingLicenceValue == 'yes' ? 1 : 2

    }
    console.log("savedSearchSaveJson", savedSearchSaveJson);

    var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search";
       this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
        data => {
          this.responseData = data;
          window.scroll(0,0);
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.resetFields();
                  this.getSaveSearchList();
          //         this.ErrorMesageFlag =false
          // this.profileData={};
          // this.errorMsg = "";
          }
          else{
             this.succesMessageFlag =false;
              //this.ErrorMesageFlag =true;
              //this.errorMsg = this.responseData.error[0];
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    ); 
  }

}

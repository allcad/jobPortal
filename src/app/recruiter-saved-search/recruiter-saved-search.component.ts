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
  timeLeftOnCutCont="";
  includeUnavailable = false;
  showContractors="";
  contractorName;
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
  showSaveSearchList = false;
  educationValue = "";
  errorSuccessMessage = "";
  industrySectorValue;
  securityClearValue;
  successMessageFlag = false;
  errorMessageFlag = false;
  saveSearchDataListing;
  sameSearchNameFlag = false;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getSecurityClearance();
    this.getIndustry();
    this.getTimeLeftData();
    this.getEducationData();
    this.getListOfSaveSearch();
  }

  industrysectorChange() {
    console.log("industrySectorValue--", this.industrySectorValue);
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
      "id":this.recentRecruiterSaveId
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("delete data--", data);
          this.getListOfSaveSearch();
          this.resetFields();
          this.successMessageFlag =  true;
          this.errorSuccessMessage = "Saved Search Delete Successfully";
          window.scroll(0,0);
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  getSaveSearchDetails(id) {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "id":id
   };
   this.recentRecruiterSaveId = id;
   console.log("this.recentRecruiterSaveId--", this.recentRecruiterSaveId)
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/detail";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("save search details--", data);
          //this.industryArrayData = data.data;
          //this.recruiterNameArray = data.data;
          if(data && data.data) {
            this.savedSearchName = data.data.recuriter_saved_search_name;
            this.addToWatchDogCheck = data.data.recuriter_search_add_to_watchdog === 1 ? true : false;
            this.jobTitle = data.data.recuriter_search_job_title;
            this.keywordSearch = data.data.recuriter_search_keywords;
            this.stemmedTerms = data.data.recuriter_search_stemmed_terms === 1 ? true : false;
            this.coreSkills = data.data.recuriter_search_core_skills;
            this.certificationValues = data.data.recuriter_search_core_skills;
            this.dontShowContractor = data.data.recuriter_search_certifications;
            this.cityTownValue = data.data.recuriter_search_location;
            this.includeRelocators = data.data.recuriter_search_include_relocators === 1 ? true : false;
            this.minRate = data.data.recuriter_search_by_rate_min;
            this.maxRate = data.data.recuriter_search_by_rate_max;
            this.dailyHourlyValue = data.data.recuriter_search_by_rate_type;
            this.timeLeftOnCutCont = data.data.recuriter_search_by_time_left;
            this.includeUnavailable = data.data.recuriter_search_by_updated_contractor_since;
            this.showContractors = data.data.recuriter_search_dont_show_to_contractor;
            this.contractorName = data.data.recuriter_search_by_contract_name;
            this.educationValue = data.data.recuriter_search_by_education;
            this.industrySectorValue = data.data.recuriter_search_by_industry;
            this.securityClearValue = data.data.recuriter_search_by_security_clearance;
            this.drivingLicenceValue = data.data.recuriter_search_by_driving_license === 1 ? 'yes' : 'no';
          }
        }
    );
  }

  getSaveSearchList() {
    this.searchListDataFlag = true;
     this.searchListData = this.saveSearchDataListing;
  }

  getListOfSaveSearch() {
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
            this.saveSearchDataListing = data.data;
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
    this.industrySectorValue = [];
    this.industrySectorValue = [];
  }

  saveSearch() {
    var savedSearchSaveJson = {
      "email":"test@test8.com",
      "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      "recuriter_saved_search_name":this.savedSearchName,
      "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
      "recuriter_search_job_title":this.jobTitle?this.jobTitle:'',
      "recuriter_search_keywords":this.keywordSearch?this.keywordSearch:'',
      "recuriter_search_stemmed_terms":this.stemmedTerms === true ? 1 : 2,
      "recuriter_search_core_skills":this.coreSkills?this.coreSkills:'',
      "recuriter_search_certifications":this.certificationValues?this.certificationValues:'',
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor?this.dontShowContractor:'',
      "recuriter_search_location":this.cityTownValue?this.cityTownValue:'',
      "recuriter_search_include_relocators":this.includeRelocators ? 1 : 2,
      "recuriter_search_by_rate_min":this.minRate?this.minRate:'',
      "recuriter_search_by_rate_max":this.maxRate?this.maxRate:'',
      "recuriter_search_by_rate_type":this.dailyHourlyValue?this.dailyHourlyValue:'',
      "recuriter_search_by_time_left":this.timeLeftOnCutCont?this.timeLeftOnCutCont:'',
      "recuriter_search_by_unavailable":this.includeUnavailable ? 1 : 2,
      "recuriter_search_by_updated_contractor_since":this.showContractors?this.showContractors:'',
      "recuriter_search_by_contract_name":this.contractorName?this.contractorName:'',
      "recuriter_search_by_education":this.educationValue?this.educationValue:[],
      "recuriter_search_by_industry":this.industrySectorValue?this.industrySectorValue:[],
      "recuriter_search_by_security_clearance":this.securityClearValue?this.securityClearValue:[],
      "recuriter_search_by_driving_license":this.drivingLicenceValue == 'yes' ? 1 : 2
     
    }

    if(this.saveSearchDataListing && this.saveSearchDataListing.length > 0) {
      for(var i=0;i<this.saveSearchDataListing.length;i++) {
        // console.log("this.saveSearchDataListing[i].recuriter_saved_search_name", this.saveSearchDataListing[i].recuriter_saved_search_name);
        // console.log("this.savedSearchName", this.savedSearchName, this.savedSearchName.toLowerCase().trim());
        if(this.saveSearchDataListing[i].recuriter_saved_search_name == this.savedSearchName.toLowerCase().trim()) {
          window.scroll(0,0);
          this.errorMessageFlag = true;
          this.errorSuccessMessage = "This Saved Search name is already exist.";
          this.sameSearchNameFlag = true;
          break;
        } else {
          this.sameSearchNameFlag = false;
          this.errorMessageFlag = false;
          this.errorSuccessMessage = "";
        }
      }
    }
    console.log("this.sameSearchNameFlag", this.sameSearchNameFlag);

    if(!this.sameSearchNameFlag) {
      if (this.recentRecruiterSaveId) {
        savedSearchSaveJson["search_id"] = this.recentRecruiterSaveId ? this.recentRecruiterSaveId : '';
        console.log("savedSearchSaveJson00", savedSearchSaveJson)
        var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search/update";
         this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
          data => {
            this.responseData = data;
            window.scroll(0,0);
            if(this.responseData.status === "TRUE"){
                    this.succesMessageFlag =true;
                    this.errorSuccessMessage = "Saved succesfully !";
                    this.successMessageFlag  = true;
                    this.errorMessageFlag = false;
                    this.resetFields();
                    this.getListOfSaveSearch();
            //         this.ErrorMesageFlag =false
            // this.profileData={};
            // this.errorMsg = "";
            }
            else{
               this.succesMessageFlag =false;
               this.errorSuccessMessage = data && data.error && data.error.length > 0 ? data.error[0] : '';
               this.successMessageFlag  = false;
               this.errorMessageFlag = true;
                //this.ErrorMesageFlag =true;
                //this.errorMsg = this.responseData.error[0];
            }
      
            // console.log("keySkill: ", this.listSignUpData);
          }
      ); 
      } else {
        var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/save_search";
         this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
          data => {
            this.responseData = data;
            window.scroll(0,0);
            if(this.responseData.status === "TRUE"){
                    this.succesMessageFlag =true;
                    this.errorSuccessMessage = "Saved succesfully !";
                    this.successMessageFlag  = true;
                    this.errorMessageFlag = false;
                    this.resetFields();
                    this.getListOfSaveSearch();
            //         this.ErrorMesageFlag =false
            // this.profileData={};
            // this.errorMsg = "";
            }
            else{
               this.succesMessageFlag =false;
               this.errorSuccessMessage = data && data.error && data.error.length > 0 ? data.error[0] : '';
               this.successMessageFlag  = false;
               this.errorMessageFlag = true;
                //this.ErrorMesageFlag =true;
                //this.errorMsg = this.responseData.error[0];
            }
      
            // console.log("keySkill: ", this.listSignUpData);
          }
      ); 
      }
    }
    //console.log("savedSearchSaveJson", savedSearchSaveJson);

    
  }

  searchResult() {
    var savedSearchSaveJson = {
      "email":"test@test8.com",
      "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      // "recuriter_saved_search_name":this.savedSearchName,
      // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
      "recuriter_search_job_title":this.jobTitle?this.jobTitle:'',
      "recuriter_search_keywords":this.keywordSearch?this.keywordSearch:'',
      "recuriter_search_stemmed_terms":this.stemmedTerms === true ? 1 : 2,
      "recuriter_search_core_skills":this.coreSkills?this.coreSkills:'',
      "recuriter_search_certifications":this.certificationValues?this.certificationValues:'',
      "recuriter_search_dont_show_to_contractor":this.dontShowContractor?this.dontShowContractor:'',
      "recuriter_search_location":this.cityTownValue?this.cityTownValue:'',
      "recuriter_search_include_relocators":this.includeRelocators ? 1 : 2,
      "recuriter_search_by_rate_min":this.minRate?this.minRate:'',
      "recuriter_search_by_rate_max":this.maxRate?this.maxRate:'',
      "recuriter_search_by_rate_type":this.dailyHourlyValue?this.dailyHourlyValue:'',
      "recuriter_search_by_time_left":this.timeLeftOnCutCont?this.timeLeftOnCutCont:'',
      "recuriter_search_by_unavailable":this.includeUnavailable ? 1 : 2,
      "recuriter_search_by_updated_contractor_since":this.showContractors?this.showContractors:'',
      "recuriter_search_by_contract_name":this.contractorName?this.contractorName:'',
      "recuriter_search_by_education":this.educationValue?this.educationValue:[],
      "recuriter_search_by_industry":JSON.stringify(this.industrySectorValue)?JSON.stringify(this.industrySectorValue) : [],
      "recuriter_search_by_security_clearance":JSON.stringify(this.securityClearValue) ?JSON.stringify(this.securityClearValue) : [],
      "recuriter_search_by_driving_license":this.drivingLicenceValue == 'yes' ? 1 : 2,
      "page":1,
      "limit":10,
      "sort":8
    }


    //if(!this.sameSearchNameFlag) {
        console.log("savedSearchSaveJson00", savedSearchSaveJson)
        var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/search";
         this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
          data => {
            //this.responseData = data;
            console.log("search result--", data);
            window.scroll(0,0);
            if(data.status === "TRUE"){
                    // this.succesMessageFlag =true;
                    // this.errorSuccessMessage = "Saved succesfully !";
                    // this.successMessageFlag  = true;
                    // this.errorMessageFlag = false;
                    // this.resetFields();
                    // this.getListOfSaveSearch();
            //         this.ErrorMesageFlag =false
            // this.profileData={};
            // this.errorMsg = "";
            }
            else {
              this.errorMessageFlag = false;
              this.errorSuccessMessage = data && data.error ? data.error : '';
               // this.succesMessageFlag =false;
               // this.errorSuccessMessage = data && data.error && data.error.length > 0 ? data.error[0] : '';
               // this.successMessageFlag  = false;
               // this.errorMessageFlag = true;
            }
      
          }
      ); 
  }

}

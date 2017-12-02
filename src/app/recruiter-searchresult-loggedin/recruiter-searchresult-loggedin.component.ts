import { Component, OnInit } from '@angular/core';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-searchresult-loggedin',
  templateUrl: './recruiter-searchresult-loggedin.component.html',
  styleUrls: ['./recruiter-searchresult-loggedin.component.css']
})
export class RecruiterSearchresultLoggedinComponent implements OnInit {
  searchList = [];
  list = [1,2,3];
  firstArrayValue = [];
  secondArray = [];
  thirdArray = [];
  pageLimit = 12;
  savedResult;
  WSErrorMsg = "";
  sortByData;
  currentSortBy = 1;
  pageNo = 1;
  addDynamicallyClass;
  showMoreDetailsFlag: boolean[];
  jobListData;
  showWatchPopup = false;
  notifyMeValue = "24 hours";
  currentContractorId;
  currentJobId;
  unwatchPopupFlag = false;
  currentUnWatchId;
  showSearchOptionFlag = false;
  searchOptionsDisabled = false;
  showSaveSearchBox = false;
  showSendSearchBox = false;
  showDownloadCVFlag = false;
  storeSaveSearchJson;
  maxPageSize;
  totalRecords;
  constructor(private _commonDataShareService: CommonDataSharedService, public _commonRequestService: CommonRequestService,
    private _commonService: CommonService, private router: Router) {
      window.scroll(0,0);
     }

  ngOnInit() {
    
  	//this.getSearchResultList();
    // this._commonDataShareService.advancedSerahcResult.subscribe((data) =>{
    //   console.log("serach result--", data);
    //       if(data) {
    //         //this.setValue(data);
    //         this.savedResult = data;
    //         this.getSearchResultList();
    //       }
    //     });
    if(this.router.url == "/public/searchresult-loggedin") {
      this.searchOptionsDisabled = true;
    }
    this.getSortByData();
    this.getJobList();
    this.savedResult = this._commonService.getSearchResult();
    console.log("this.savedResult", this.savedResult)
    if(this.savedResult) {
      this.getSearchResultList();
    }
  }

  goToAdvancedSearch() {
    this.router.navigate(['./recruiter/advanced-search']);
  }

  getSortByData() {
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by_recruiter_search ";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
         console.log("short by--", data);
         if(data) {
           this.sortByData = data.data;
           
        }
      }
    );
  }

  openWatchPopup(item) {
    this.showWatchPopup = true;
    this.currentContractorId = item && item.contractor_id ? item.contractor_id : '';
  }

  closePopup() {
    this.showWatchPopup = false;
  }

  openUnWatchPopup(item) {
    this.unwatchPopupFlag = true;
    this.currentUnWatchId = item && item.watch_id ? item.watch_id : '';
  }

  closeUnwatchPopup() {
    this.unwatchPopupFlag = false;
  }

  showDownloadCVPopup() {
    this.showDownloadCVFlag = true;
  }

  closeDownloadCVPopup() {
    this.showDownloadCVFlag = false;
  }

  addToWatchList() {
      var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "contractor_id":this.currentContractorId,
      "Job_id":this.currentJobId,
      "notify":this.notifyMeValue


   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_add";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("add watch list--", data);
         // this.getWatchDogListData(this.pageNo);
          this.router.navigate(['./recruiter/watch-list']);
        }
    );
  }

  unwatchContractor() {
      var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "watch_id":this.currentUnWatchId
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("unwatch--", data);
         this.unwatchPopupFlag = false;
         // this.getWatchDogListData(this.pageNo);
          //this.router.navigate(['./recruiter/watch-list']);
        }
    );
  }

  sortChange() {
    this.getSearchResultList();
  }

  getJobList() {
    var input = {
      "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "page":1,
    "limit": -1

    }
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/list";
       this._commonRequestService.postData(wsUrl, input).subscribe(
        data => {
         console.log("filter by--", data);
         if(data) {
           this.jobListData = data.data;
           
        }
      }
    );
  }

  goToContractorProfile(contractorId, name) {
    var obj = {'currentContractorId' : contractorId, 'currentContractorName': name, 'type':'search-result'};
    localStorage.setItem('currentContractorData', JSON.stringify(obj));
    this.router.navigate(['./recruiter/view-contractor-profile']);
  }

  showMoreDetails(index) {
    this.showMoreDetailsFlag[index] = !this.showMoreDetailsFlag[index];
    //console.log("this.showMoreDetailsFlag[index]", this.showMoreDetailsFlag[index]);
    // if(this.showMoreDetailsFlag[index]) {
    //   this.addDynamicallyClass = "more-details-toggle";
    // } else {
    //   this.addDynamicallyClass = "";
    // }
  }

  getSearchResultList() {
    console.log("value--", this.savedResult);
    var savedSearchSaveJson = {};
    if(this.savedResult && typeof this.savedResult == 'string') {
      savedSearchSaveJson = {
        // "email":"test@test8.com",
        // "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
        // "recuriter_saved_search_name":this.savedSearchName,
        // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
        "recuriter_search_job_title":this.savedResult ? this.savedResult :'',
        "recuriter_search_keywords": '',
        "recuriter_search_stemmed_terms":0,
        "recuriter_search_core_skills": '',
        "recuriter_search_certifications": '',
        "recuriter_search_dont_show_to_contractor": '',
        "recuriter_search_location": '',
        "recuriter_search_include_relocators": 0,
        "recuriter_search_by_rate_min": '',
        "recuriter_search_by_rate_max": '',
        "recuriter_search_by_rate_type": '',
        "recuriter_search_by_time_left": '',
        "recuriter_search_by_unavailable": 1,
        "recuriter_search_by_updated_contractor_since": '',
        "recuriter_search_by_contract_name": '',
        "recuriter_search_by_education": '',
        "recuriter_search_by_industry": '',
        "recuriter_search_by_security_clearance": '',
        "recuriter_search_by_driving_license": 0,
        "page":this.pageNo,
        "limit":this.pageLimit,
        "sort":this.currentSortBy
        }
    } else if(this.savedResult && typeof this.savedResult == 'object') {
      console.log("currentSortBy", this.currentSortBy);
      savedSearchSaveJson = this.savedResult;
      savedSearchSaveJson['sort'] = this.currentSortBy;
      savedSearchSaveJson['page'] = this.pageNo;
      savedSearchSaveJson['limit'] = this.pageLimit;
    }
    this.storeSaveSearchJson = savedSearchSaveJson;
    this.searchList = [];
    this.firstArrayValue = [];
    this.secondArray = [];
    this.thirdArray = [];
    this.maxPageSize = '';
    this.totalRecords = '';
    //if(!this.sameSearchNameFlag) {
        console.log("savedSearchSaveJson00", savedSearchSaveJson)
        var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/search";
         this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
          data => {
            //this.responseData = data;
            console.log("search result--", data);
            window.scroll(0,0);
            if(data.status === "TRUE"){
              this.maxPageSize = data.TotalPage;
              this.totalRecords = data.recordsTotal;
              this.searchList = data.data;
              this.showMoreDetailsFlag = Array(this.searchList.length).fill(false);
              console.log("this.searchList", this.searchList);
             for(var i=0;i<4;i++) {
               if(this.searchList && this.searchList[i]) {
                 this.firstArrayValue[i] = this.searchList[i];
               }
             };
             
           if(this.searchList.length > 4) {
             this.secondArray = [];
             for(var i=0; i<4; i++) {
               if(this.searchList && this.searchList[i+4]) {
                 this.secondArray[i] = this.searchList[i+4];
               }
             }
           } else {
             this.secondArray = [];
           }
           if(this.searchList.length > 8) {
             this.thirdArray = [];
             for(var i=0; i<this.searchList.length; i++) {
               console.log("this.searchList[i+9]", this.searchList[i+8]);
               if(this.searchList && this.searchList[i+8]) {
                 this.thirdArray[i] = this.searchList[i+8];
               }
             }
           } else {
             this.thirdArray = [];
           }
           console.log("firstarrayValue", this.firstArrayValue);
           console.log("secondArray", this.secondArray);
           console.log("thirdArray", this.thirdArray);

              this.WSErrorMsg = "";
            }
            else {
              // this.errorMessageFlag = true;

               this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
      
          }
      ); 
  
  }

  onPageClick(pageNo) {
    this.pageNo = 1;
    this.pageLimit = parseInt(pageNo);
    this.getSearchResultList();
  }

  getRangeSliderValue(event){

  }

   showMoreContractors() {
    // console.log("before", this.currentPageNo);
    // console.log("this.onPageClick", this.onPageClick);
    //this.pageNo = 2;
     //console.log("this.pageNo before", this.pageNo)
    //this.pageNo += 1;
    if(this.maxPageSize >= this.pageNo) {
      this.pageNo += 1;
    }
    //console.log("this.pageNo", this.pageNo)
    // if(this.maxPageSize >= this.pageNo) {
    //   this.pageLimit = this.pageLimit * this.pageNo;
      
    // } 
    // if(this.pageLimit > this.totalRecords) {
    //     this.pageLimit = 12 * this.pageNo;
    //   }
      this.getSearchResultList();
    //console.log("this.currentPageNo", this.currentPageNo);
    //this.getSearchResultList();
  }

}

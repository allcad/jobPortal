import { Component, OnInit } from '@angular/core';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';

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
  constructor(private _commonDataShareService: CommonDataSharedService, public _commonRequestService: CommonRequestService,
    private _commonService: CommonService) { }

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
    this.savedResult = this._commonService.getSearchResult();
    console.log("this.savedResult", this.savedResult)
    this.getSearchResultList();
  }

  getSearchResultList() {
    console.log("value--", this.savedResult);
    var savedSearchSaveJson = {};
    if(typeof this.savedResult == 'string') {
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
        "page":1,
        "limit":this.pageLimit,
        "sort":8
        }
    } else if(typeof this.savedResult == 'object') {
      savedSearchSaveJson = this.savedResult;
    }

    this.searchList = [];

    


    //if(!this.sameSearchNameFlag) {
        console.log("savedSearchSaveJson00", savedSearchSaveJson)
        var inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/search";
         this._commonRequestService.postData(inputUrl, savedSearchSaveJson).subscribe(
          data => {
            //this.responseData = data;
            console.log("search result--", data);
            window.scroll(0,0);
            if(data.status === "TRUE"){

              this.searchList = data.data;
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
    this.pageLimit = pageNo;
    this.getSearchResultList();
  }

  getRangeSliderValue(event){

  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-watchdog',
  templateUrl: './recruiter-watchdog.component.html',
  styleUrls: ['./recruiter-watchdog.component.css']
})
export class RecruiterWatchdogComponent implements OnInit {
	list=[1,2,3];
  sortByData;
  currentSortBy;
  watchListDataArr = [];
  watchListDataArrCount = 0;
  onPageClick = 10;
  pageNo = 1;
  currentPageNo = 10;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
    private _commonDataSharedService: CommonDataSharedService, private commonService : CommonService) { }

  ngOnInit() {
    this.getSortByData();
  }

  getSortByData() {
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/watchdogs_sort_by";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
         console.log("short by--", data);
         if(data) {
           this.sortByData = data.data;
           this.currentSortBy = 3;
           this.getWatchDogListData(this.pageNo);
         }
        }
    );
  }

  getWatchDogListData(pageNo) {
    console.log("currentSortBy--", this.currentSortBy);
     var input = {
     "email":"test@test7.com",
  "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "sort_by_id":this.currentSortBy,
    "page":this.pageNo,
    "limit":this.onPageClick
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("recruiterId--", data);
         if (data && data.data) {           
           this.watchListDataArr = data.data;
           this.watchListDataArrCount = data.data.length;
         } else {
           this.watchListDataArr = [];
           this.watchListDataArrCount = 0;
         }
         
        }
    );
  }

  deleteWatchDog(id) {
    console.log("currentSortBy--", id);
     var input = {
     "email":"test@test7.com",
  "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "id":id
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("recruiterId--", data);
         this.getWatchDogListData(this.pageNo);
         this.router.navigate(['./recruiter/watchdog']);
        }
    );
  }

  shareContractorProfile(id) {
    console.log("currentSortBy--", id);
     var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "contractor_id":id,
      "send_to":"test@test.com"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/send_contractor_by_email";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("result shrae email--", data);
         // this.getWatchDogListData(this.pageNo);
         // this.router.navigate(['./recruiter/watchdog']);
        }
    );
  }

  playButtonClick(item) {
   //  console.log("currentSortBy--", id);
   //   var input = {
   //   "email":"test@test7.com",
   //    "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
   //    "contractor_id":id,
   //    "Job_id":2,
   //    "notify":"1 week"


   // };
   // console.log("input--", input);
   // var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_add";
   //     this._commonRequestService.postData(wsUrl,input).subscribe(
   //      data => {
   //       console.log("add watch list--", data);
   //       // this.getWatchDogListData(this.pageNo);
   //       // this.router.navigate(['./recruiter/watchdog']);
   //      }
   //  );
   if(item) {
     var savedSearchSaveJson = {
        "email":"test@test8.com",
        "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
        // "recuriter_saved_search_name":this.savedSearchName,
        // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
        "recuriter_search_job_title": item && item.params && item.params.recuriter_search_job_title,
        "recuriter_search_keywords":item && item.params && item.params.recuriter_search_keywords,
        "recuriter_search_stemmed_terms":item && item.params && item.params.recuriter_search_stemmed_terms,
        "recuriter_search_core_skills":item && item.params && item.params.recuriter_search_core_skills,
        "recuriter_search_certifications":item && item.params && item.params.recuriter_search_certifications,
        "recuriter_search_dont_show_to_contractor":item && item.params && item.params.recuriter_search_dont_show_to_contractor,
        "recuriter_search_location":item && item.params && item.params.recuriter_search_location,
        "recuriter_search_include_relocators":item && item.params && item.params.recuriter_search_include_relocators,
        "recuriter_search_by_rate_min":item && item.params && item.params.recuriter_search_by_rate_min,
        "recuriter_search_by_rate_max":item && item.params && item.params.recuriter_search_by_rate_max,
        "recuriter_search_by_rate_type":item && item.params && item.params.recuriter_search_by_rate_type,
        "recuriter_search_by_time_left":item && item.params && item.params.recuriter_search_by_time_left,
        "recuriter_search_by_unavailable":item && item.params && item.params.recuriter_search_by_unavailable,
        "recuriter_search_by_updated_contractor_since":item && item.params && item.params.recuriter_search_by_updated_contractor_since,
        "recuriter_search_by_contract_name":item && item.params && item.params.recuriter_search_by_contract_name,
        "recuriter_search_by_education":item && item.params && item.params.recuriter_search_by_education,
        "recuriter_search_by_industry":item && item.params && item.params.recuriter_search_by_industry ? item.params.recuriter_search_by_industry.toString() : '',
        "recuriter_search_by_security_clearance":item && item.params && item.params.recuriter_search_by_security_clearance ? item.params.recuriter_search_by_security_clearance.toString() : '',
        "recuriter_search_by_driving_license":item && item.params && item.params.recuriter_search_by_driving_license
        //"page":1,
        //"limit":12
        //"sort":8
      }

      this.commonService.setSearchResult(savedSearchSaveJson);
      this.router.navigate(['/recruiter/searchresult-loggedin']);
    }
  }

  editJob(id) {
  //   console.log("currentSortBy--", id);
  //    var input = {
  //    "email":"test@test7.com",
  // "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
  //   "id":id
  //  };
  //  console.log("input--", input);
  //  var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watchdogs/delete";
  //      this._commonRequestService.postData(wsUrl,input).subscribe(
  //       data => {
  //        console.log("recruiterId--", data);
  //        this.getWatchDogListData();
  //       }
  //   );
  var input = {"watchDogId": id ? id : ''};
  var obj = {'watchDogData' : input};
  localStorage.setItem('watchDogData', JSON.stringify(obj));
  this.router.navigate(['./recruiter/saved-watch-dog']);

  }


  onPageJobList(pageNo) {
    //this.currentPageNo = parseInt(pageNo);
    this.onPageClick = parseInt(pageNo);    
     this.pageNo = 1;
    this.getWatchDogListData(pageNo);
  }

  showMoreJobs() {
    // console.log("before", this.currentPageNo);
    // console.log("this.onPageClick", this.onPageClick);
    //this.pageNo = 2;
     //console.log("this.pageNo before", this.pageNo)
    this.pageNo += 1;
    //console.log("this.pageNo", this.pageNo)
    this.currentPageNo = this.onPageClick * this.pageNo;
    //console.log("this.currentPageNo", this.currentPageNo);
    this.getWatchDogListData(this.currentPageNo);
  }

}

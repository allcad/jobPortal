import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';

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
    private _commonDataSharedService: CommonDataSharedService) { }

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

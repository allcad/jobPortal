import { Component, OnInit } from '@angular/core';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-watch-list',
  templateUrl: './recruiter-watch-list.component.html',
  styleUrls: ['./recruiter-watch-list.component.css']
})
export class RecruiterWatchListComponent implements OnInit {

	watchListSortData;
	filterByJobData;
	watchListData = [];
	currentSortBy = 1;
	filterByJobId = 0;
	pageNo = 1;
	pageLimit = 12;
	errorMsg = "";
	firstArray = [];
	secondArray = [];
	thirdArray = [];
  maxPage;
  maxRecord;
  constructor(private _commonDataShareService: CommonDataSharedService, public _commonRequestService: CommonRequestService,
    private _commonService: CommonService, private router: Router) { }

  ngOnInit() {
  	this.getSortByData();
  	this.getFilterbyJobData();
  	this.getWatchListData();
  }

  filterByJobChange() {
  	this.getWatchListData();
  }

  sortChange() {
  	this.getWatchListData();
  }

  getSortByData() {
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by_recruiter_search ";
       this._commonRequestService.getData(wsUrl).subscribe(
        data => {
         console.log("short by--", data);
         if(data) {
           this.watchListSortData = data.data;
           
        }
      }
    );
  }

  getFilterbyJobData() {
  	var input = {
  		"email":"test@test7.com",
		"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
		"page":this.pageNo,
		"limit": -1

  	}
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/list";
       this._commonRequestService.postData(wsUrl, input).subscribe(
        data => {
         console.log("filter by--", data);
         if(data) {
           this.filterByJobData = data.data;
           
        }
      }
    );
  }

  getWatchListData() {
  	var input = {
  		"email":"test@test7.com",
		"loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
		"page":this.pageNo,
		"limit":this.pageLimit,
		"sort":this.currentSortBy,
		"job_id":this.filterByJobId

  	}
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_list";
       this._commonRequestService.postData(wsUrl, input).subscribe(
        data => {
         console.log("watch list--", data);
         // if(data) {
         //   this.watchListData = data.data;
           if(data && data.status === "TRUE") {
           this.errorMsg = "";
           this.maxPage = data.TotalPage;
           this.maxRecord = data.recordsTotal;
           //this.errorMsgFlag = false;
           //this.watchListData = data.data;
           for(var i=0;i<data.data.length;i++) {
             this.watchListData.push(data.data[i]);
           }
             for(var i=0;i<4;i++) {
             	if(this.watchListData && this.watchListData[i]) {
             		this.firstArray[i] = this.watchListData[i];
             	}
             };
             
           if(this.watchListData.length > 4) {
             this.secondArray = [];
             for(var i=0; i<4; i++) {
             	if(this.watchListData && this.watchListData[i+4]) {
             		this.secondArray[i] = this.watchListData[i+4];
             	}
             }
           } else {
             this.secondArray = [];
           }
           if(this.watchListData.length > 8) {
             this.thirdArray = [];
             for(var i=0; i<this.watchListData.length; i++) {
               console.log("this.watchListData[i+8]", this.watchListData[i+8]);
             	if(this.watchListData && this.watchListData[i+8]) {
             		this.thirdArray[i] = this.watchListData[i+8];
             	}
             }
           } else {
             this.thirdArray = [];
           }
           console.log("firstarray", this.firstArray);
           console.log("secondArray", this.secondArray);
           console.log("thirdArray", this.thirdArray);
          } else {
            if(data && data.status === 'FALSE') {
            //this.errorMsgFlag = true;
              this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
           
        }
      //}
    );
  }

  onPageClick(page) {
  	this.pageLimit = parseInt(page);
    this.watchListData = [];
    this.firstArray = [];
    this.secondArray = [];
    this.thirdArray = [];
  	this.getWatchListData();
  }

  showMoreList() {
    if(this.maxPage >= this.pageNo) {
      this.pageNo += 1;
    }
    this.getWatchListData();
  }

  watchContractorProfile(contractorId, firstName, lastName) {
    var name = firstName + " " + lastName;
    var obj = {'currentContractorId' : contractorId, 'currentContractorName': name, 'type':'watchList'};
    localStorage.setItem('currentContractorData', JSON.stringify(obj));
    this.router.navigate(['./recruiter/view-contractor-profile']);
  }

}

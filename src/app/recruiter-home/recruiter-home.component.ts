import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';


@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
  styleUrls: ['./recruiter-home.component.css']
})
export class RecruiterHomeComponent implements OnInit {
	listingData = [];
  pageNo = 1;
  pageLimit = 10;
  sortType = 'least';
  leastMostData;
  wsError = "";
  quickLinkData;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService, private _commonService: CommonService) { }

  ngOnInit() {
    this.getQuickLinksData();
       
    
  	//this.getRecruiterCount();
  	this.getMostLeastJobs('least');
  }
  passJobId(id) {
  	//this._commonDataSharedService.manageJobsJobId.next(id);
  	// var obj = {'jobId' : id};
   //  localStorage.setItem('recruiterJobData', JSON.stringify(obj));
   this._commonService.setJobIdForJobPosting(id);
  }


  getMostLeastJobs(type) {
    this.wsError = "";
    this.leastMostData = [];
    this.sortType = type;
   var input = {
   	"email":"test@test7.com",
    "loginToken":"$2y$10$WGsOK7LOBpmlMgYPI/3W6eHI0bZf.YW6mS2WxGNlTDcWXAnhNY3Be",
    "page":this.pageNo,
    "limit":this.pageLimit,
    "sort_type":type

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/most_least/application";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("least most data--", data);
         if(data && data.status === "TRUE") {
           this.leastMostData = data.data;
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
            // this.errorMsgFlag = true;
            //   this.errorMsg = data.error[0];
            }
          }
        }
    );
  }

  getQuickLinksData() {
    this.wsError = "";
   var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$WGsOK7LOBpmlMgYPI/3W6eHI0bZf.YW6mS2WxGNlTDcWXAnhNY3Be"
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/deashboard_quicklink";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("Quick data", data);
         if(data && data.status === "TRUE") {
           this.quickLinkData = data.data;
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
        }
    );
  }

  showMoreJobs() {
    var pageNo = 1;
    pageNo += 1;
    //this.pageNo += 1;
    this.pageLimit = this.pageLimit * pageNo;
    console.log("this.pageLimit", this.pageLimit)
    this.getMostLeastJobs(this.sortType)
  }

}

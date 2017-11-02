import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-recruiter-manage-jobs',
  templateUrl: './recruiter-manage-jobs.component.html',
  styleUrls: ['./recruiter-manage-jobs.component.css']
})
export class RecruiterManageJobsComponent implements OnInit {
	listingData = [];
	recruiterName;
	firstArray = [];
	secondArray = [];
	thirdArray = [];
	currentPageNo = 9;
  errorMsg = "";
  errorMsgFlag = false;
  jobPostFlag = false;
  pageNo = 1;
  onPageClick = 9;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {
  	this.getManageJobsList(9);
  }

  passJobId(id) {
  	//this._commonDataSharedService.manageJobsJobId.next(id);
  	var obj = {'jobId' : id};
    localStorage.setItem('recruiterJobData', JSON.stringify(obj));
  }

  recruiterList(recruiterId) {
  	 var input = {
   	"email":"test@test7.com",
	"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("recruiterId--", data);
         for(var i=0;i<data.data.length;i++) {
         	if(data.data[i].recuriter_id === parseInt(recruiterId)) {
         		this.recruiterName = data.data[i].recuriter_contact_name
         	}
         }
         console.log("this.recruiterName", this.recruiterName);
         //this.listingData = data.data;
         
        }
    );
       return this.recruiterName;
  }

  getManageJobsList(pageLimit) {
    console.log("pageLimit--", pageLimit);
   var input = {
   	"email":"test@test7.com",
	"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
   	"page":1,
	"limit":pageLimit
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("data from manage job list--", data);
         if(data && data.status === "TRUE") {
           this.errorMsgFlag = false;
           this.listingData = data.data;
           for(var i=0;i<3;i++) {
           	if(this.listingData && this.listingData[i]) {
           		this.firstArray[i] = this.listingData[i];
           	}
           };
           for(var i=0; i<6; i++) {
           	if(this.listingData && this.listingData[i+3]) {
           		this.secondArray[i] = this.listingData[i+3];
           	}
           }
           if(this.listingData.length > 9) {
             this.thirdArray = [];
             for(var i=0; i<this.listingData.length; i++) {
               console.log("this.listingData[i+9]", this.listingData[i+9]);
             	if(this.listingData && this.listingData[i+9]) {
             		this.thirdArray[i] = this.listingData[i+9];
             	}
             }
           } else {
             this.thirdArray = [];
           }
           console.log("firstarray", this.firstArray);
           console.log("secondArray", this.secondArray);
           console.log("thirdArray", this.thirdArray);
          } else {
            if(data && data.error && data.error.length > 0) {
            this.errorMsgFlag = true;
              this.errorMsg = data.error[0];
            }
          }
        }
    );
  }

  onPageJobList(pageNo) {
    //this.currentPageNo = parseInt(pageNo);
    this.onPageClick = parseInt(pageNo);
    this.firstArray = [];
     this.secondArray = [];
     this.secondArray = [];
     this.listingData = [];
     this.pageNo = 1;
    this.getManageJobsList(pageNo);
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
    this.getManageJobsList(this.currentPageNo);
  }

}

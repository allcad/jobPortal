import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
@Component({
  selector: 'app-recruiter-view-applications',
  templateUrl: './recruiter-view-applications.component.html',
  styleUrls: ['./recruiter-view-applications.component.css']
})
export class RecruiterViewApplicationsComponent implements OnInit {

 listingData = [];
	recruiterName;
	firstArray = [];
	secondArray = [];
	thirdArray = [];
	currentPageNo = 12;
  errorMsg = "";
  errorMsgFlag = false;
  jobPostFlag = false;
  pageNo = 1;
  onPageClick = 12;
  loopArray = [];
  filterByJobData;
  currentJobId = 0;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {
  	this.getApplicationList(12);
    this.getFilterbyJobData();
  }

  passJobId(id) {
  	//this._commonDataSharedService.manageJobsJobId.next(id);
  	var obj = {'jobId' : id};
    localStorage.setItem('recruiterJobData', JSON.stringify(obj));
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

  

  getApplicationList(pageLimit) {
    console.log("pageLimit--", pageLimit);
   var input = {
   	"email":"test@test7.com",
	"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
   	"page":1,
	"limit":pageLimit,
	"jobid":this.currentJobId.toString()
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/application/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
        	this.firstArray = [];
         console.log("data from manage job list--", data);
         if(data && data.status === "TRUE") {
           this.errorMsgFlag = false;
           this.listingData = data.data;
           console.log("this.listingData--", this.listingData, this.listingData.length);
           //this.loopArray = this.listingData.length/4;

           // for (let i=0; i<(this.listingData.length%4)+1;i++) {

           // 	this.loopArray.push("");
           // }

           for(var i=0;i<4;i++) {
           	if(this.listingData && this.listingData[i]) {
           		this.firstArray[i] = this.listingData[i];
           	}
           };
           // for(var i=0; i<6; i++) {
           // 	if(this.listingData && this.listingData[i+3]) {
           // 		this.secondArray[i] = this.listingData[i+3];
           // 	}
           // }
           if(this.listingData.length > 4) {
             this.secondArray = [];
             for(var i=0; i<this.listingData.length; i++) {
               console.log("this.listingData[i+4]", this.listingData[i+4]);
             	if(this.listingData && this.listingData[i+4]) {
             		this.secondArray[i] = this.listingData[i+4];
             	}
             }
           } else {
             this.secondArray = [];
           }
           // console.log("firstarray", this.firstArray);
           // console.log("secondArray", this.secondArray);
           // console.log("thirdArray", this.thirdArray);
          } else {
            if(data && data.error && data.error.length > 0) {
            this.errorMsgFlag = true;
              this.errorMsg = this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
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
     this.listingData = [];
     this.pageNo = 1;
    this.getApplicationList(pageNo);
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
    this.getApplicationList(this.currentPageNo);
  }

  viewContractorProfile(contractorId, firstName, lastName) {
    var name = firstName + " " + lastName;
  	var obj = {'currentContractorId' : contractorId, 'currentContractorName': name, 'type':'viewApplication'};
    localStorage.setItem('currentContractorData', JSON.stringify(obj));
  	this.router.navigate(['./recruiter/view-contractor-profile']);
  }


}

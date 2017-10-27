import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-recruiter-preview-job',
  templateUrl: './recruiter-preview-job.component.html',
  styleUrls: ['./recruiter-preview-job.component.css']
})
export class RecruiterPreviewJobComponent implements OnInit {
  previewDataList:any;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {
  	// this._commonDataSharedService.manageJobsJobId.subscribe(data=> {
  	// 	console.log("data--", data);
  	// 	if(data) {
  	// 		this.jobList(data);
  	// 	}
  	// })
  	var localStorageData = JSON.parse(localStorage.getItem('recruiterJobData'));
  	console.log("localStorageData--", localStorageData);
  	if(localStorageData && localStorageData.jobId) {
  		this.jobList(localStorageData.jobId);
  	}
  }

  jobList(jobId) {
  	 var input = {
   	"email":"test@test7.com",
	"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
	"jobid":jobId

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("jobList--", data);
         this.previewDataList = data.data;
         console.log("this.previewDataList--", this.previewDataList);
        }
    );
  }

}

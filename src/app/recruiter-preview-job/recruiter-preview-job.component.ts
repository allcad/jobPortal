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
  previewJobErrorMsg;
  jobPostFlag = false;
  uniqueJobId;
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
      this.uniqueJobId = localStorageData.jobId;
  		this.jobList(localStorageData.jobId);
  	}
    var jobPostingLocalStorage = JSON.parse(localStorage.getItem('jobPostingData'));
    console.log("jobPostingLocalStorage--", jobPostingLocalStorage);
    if(jobPostingLocalStorage && jobPostingLocalStorage.jobPreviewData) {
      this.previewDataList = jobPostingLocalStorage.jobPreviewData;
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

  goToJobPosting() {
    if(!this.uniqueJobId) {
      var obj = {'jobPreviewData' : this.previewDataList};
      localStorage.setItem('editJobPost', JSON.stringify(obj));
    }
  }

  saveJobPost() {
    console.log('this.previewDataList--', this.previewDataList);
    var input;
    if(this.previewDataList) {
      input={
        "email":"test@test7.com",
        "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
        "jobTitle": this.previewDataList.jobTitle ? this.previewDataList.jobTitle: '',
        "duration": this.previewDataList.duration ? this.previewDataList.duration: '',
        "startDate": this.previewDataList.startDate ? this.previewDataList.startDate: '',
        "industrySectorId": this.previewDataList.industrySectorId ? this.previewDataList.industrySectorId: '',
        "workEligibilityId" : this.previewDataList.workEligibilityId ? this.previewDataList.workEligibilityId: '',
        "cityTown": this.previewDataList.cityTown ? this.previewDataList.cityTown: '',
        "prefereedRate": {
          "minRate": this.previewDataList.prefereedRate.minRate ? this.previewDataList.prefereedRate.minRate: '0',
          "maxRate": this.previewDataList.prefereedRate.maxRate ? this.previewDataList.prefereedRate.maxRate: '',
          "dailyHourlyRate": this.previewDataList.prefereedRate.dailyHourlyRate ? this.previewDataList.prefereedRate.dailyHourlyRate: ''
        },
        "jobSpecification": this.previewDataList.jobSpecificationTitle ? this.previewDataList.jobSpecificationTitle: "",
        "jobSpecificationTitle": this.previewDataList.jobSpecification !== "" ? this.previewDataList.jobSpecification: this.previewDataList.jobTitle,
        "recruiterNameId": this.previewDataList.recruiterNameId ? this.previewDataList.recruiterNameId: '',
        "saveTempleteAs": this.previewDataList.saveTempleteAs ? this.previewDataList.saveTempleteAs: '',
        "jobReference": this.previewDataList.jobReference ? this.previewDataList.jobReference: '',
        "recuriter_job_is_featured": this.previewDataList.recuriter_job_is_active ? this.previewDataList.recuriter_job_is_active: '0'

        }
        var wsUrl;
        if(!this.uniqueJobId) {
          console.log("this.input", input);
           wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/add";
           this._commonRequestService.postData(wsUrl,input).subscribe(
            data => {
              console.log("data result", data);
              if(data && data.status === "TRUE") {
                this.jobPostFlag = false;
                this.previewJobErrorMsg = "";
                this.router.navigate(['/recruiter/manage-jobs']);
              } else if(data && data.error){
                this.previewJobErrorMsg = data && data.error && data.error.length > 0 ? data.error[0] : '';
                this.jobPostFlag = true;
              }
              //this.jobPostFlag = true;
            }
        );
      } else {
        input['jobid'] = this.uniqueJobId;
        wsUrl=" http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/submit/edit";
        console.log("input with job id-", input);
           this._commonRequestService.postData(wsUrl,input).subscribe(
            data => {
              console.log("data result", data);
              if(data && data.status === "TRUE") {
                this.jobPostFlag = false;
                this.previewJobErrorMsg = "";
                this.router.navigate(['/recruiter/manage-jobs']);
              } else if(data && data.error){
                this.previewJobErrorMsg = data && data.error && data.error.length > 0 ? data.error[0] : '';
                this.jobPostFlag = true;
              }
              //this.jobPostFlag = true;
            }
        );
      }
    }
  }

}

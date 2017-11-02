import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';
import { FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-recruiter-job-posting',
  templateUrl: './recruiter-job-posting.component.html',
  styleUrls: ['./recruiter-job-posting.component.css']
})
export class RecruiterJobPostingComponent implements OnInit {

jobPostingJobTitle: string;
jobPostingDuration;
startDate;
industrySector = "0";
workEligibility = "0";
cityTownValue;
minRate: number;
maxRate: number;
dailyHourlyValue;
jobSpecificationTitle: any;
jobSpecificationBody: any;
recruiterName = "0";
saveTemplateAs;
jobReference;
input;
jobPostingDetails;
recruiterNameArray;
jobPostFlag = false;
jobPostingJobId = '';
editJobId = '';
industryDataArray;
  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.recruiterNameList();
    this.getIndustry();
    var localStorageData = JSON.parse(localStorage.getItem('recruiterJobData'));
    console.log("localStorageData--", localStorageData);
    if(localStorageData && localStorageData.jobId) {
      this.jobPostingJobId = localStorageData.jobId;
      this.jobPostingData(localStorageData.jobId);
    }
    var editJoblocalStorageData = JSON.parse(localStorage.getItem('editJobPost'));
    console.log("editJoblocalStorageData", editJoblocalStorageData);
    if(editJoblocalStorageData && editJoblocalStorageData.jobPreviewData) {
      this.jobPostingJobTitle = editJoblocalStorageData.jobPreviewData.jobTitle;
       this.jobPostingDuration = editJoblocalStorageData.jobPreviewData.duration;
       this.startDate = editJoblocalStorageData.jobPreviewData.startDate;
       this.industrySector = editJoblocalStorageData.jobPreviewData.industrySectorId;
       this.workEligibility = editJoblocalStorageData.jobPreviewData.workEligibilityId;
       this.cityTownValue = editJoblocalStorageData.jobPreviewData.cityTown;
       this.minRate = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.minRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.minRate : 0;
       this.maxRate = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.maxRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.maxRate : 0
       this.dailyHourlyValue = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.dailyHourlyRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.dailyHourlyRate : '';
       this.jobSpecificationTitle = editJoblocalStorageData.jobPreviewData.jobSpecificationTitle;
       this.jobSpecificationBody = editJoblocalStorageData.jobPreviewData.jobSpecification;
       this.recruiterName = editJoblocalStorageData.jobPreviewData.recruiterNameId;
       this.saveTemplateAs = editJoblocalStorageData.jobPreviewData.saveTempleteAs;
       this.jobReference = editJoblocalStorageData.jobPreviewData.jobReference;
       this.editJobId = editJoblocalStorageData.jobPreviewData.jobId;
    }
  }

  getIndustry() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("industryArrayData--", data);
          this.industryDataArray = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

   recruiterNameList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          this.recruiterNameArray = data.data;
        }
    );
       return this.recruiterName;
  }

  jobPostingData(jobId) {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "jobid":jobId

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          this.jobPostFlag = false;
         console.log("jobList--", data);
         if(data && data.data) {
           this.jobPostingDetails = data.data;
           this.jobPostingJobTitle = this.jobPostingDetails.jobTitle;
           this.jobPostingDuration = this.jobPostingDetails.duration;
           this.startDate = this.jobPostingDetails.startDate;
           this.industrySector = this.jobPostingDetails.industrySectorId;
           this.workEligibility = this.jobPostingDetails.workEligibilityId;
           this.cityTownValue = this.jobPostingDetails.cityTown;
           this.minRate = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.minRate ? this.jobPostingDetails.prefereedRate.minRate : 0;
           this.maxRate = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.maxRate ? this.jobPostingDetails.prefereedRate.maxRate : 0
           this.dailyHourlyValue = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.dailyHourlyRate ? this.jobPostingDetails.prefereedRate.dailyHourlyRate : '';
           this.jobSpecificationTitle = this.jobPostingDetails.jobSpecificationTitle;
           this.jobSpecificationBody = this.jobPostingDetails.jobSpecification;
           this.recruiterName = this.jobPostingDetails.recruiterNameId;
           this.saveTemplateAs = this.jobPostingDetails.saveTempleteAs;
           this.jobReference = this.jobPostingDetails.jobReference;
         }
        }
    );
  }

  onJobPostSave(f:NgForm) {
  	this.input={
        //"email":this.email,
        // "password":this.password,
        //"loginToken": this.getData.data.loginToken,
			"email":"test@test7.com",
			"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
			"jobTitle": this.jobPostingJobTitle,
			"duration": this.jobPostingDuration,
			"startDate": this.startDate,
			"industrySectorId": this.industrySector,
			"workEligibilityId" : this.workEligibility,
			"cityTown": this.cityTownValue,
			"prefereedRate": {
				"minRate": this.minRate,
				"maxRate": this.maxRate,
				"dailyHourlyRate": this.dailyHourlyValue
			},
			"jobSpecification": this.jobSpecificationBody,
			"jobSpecificationTitle": this.jobSpecificationTitle,
			"recruiterNameId": this.recruiterName,
			"saveTempleteAs": this.saveTemplateAs,
			"jobReference": this.jobReference,
      "recuriter_job_is_featured": "0"

      }
      var wsUrl;
      //alert(0);
      console.log("this.input", this.input);
    wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/add";
       this._commonRequestService.postData(wsUrl,this.input).subscribe(
        data => {
        	console.log("data result", data);
          window.scroll(0,0);
          this.jobPostFlag = true;
          this.jobPostingDetails = "";
           this.jobPostingJobTitle = "";
           this.jobPostingDuration = "";
           this.startDate = "";
           this.industrySector = "0";
           this.workEligibility = "0";
           this.cityTownValue = "";
           this.minRate = 0;
           this.maxRate = 0;
           this.dailyHourlyValue = "";
           this.jobSpecificationTitle = "";
           this.jobSpecificationBody = "";
           this.recruiterName = "0";
           this.saveTemplateAs = "";
           this.jobReference = "";
        }
    );
  }

  previewJob() {
    var input={
      "jobTitle": this.jobPostingJobTitle ? this.jobPostingJobTitle : '',
      "duration": this.jobPostingDuration ? this.jobPostingDuration : '',
      "startDate": this.startDate ? this.startDate : '',
      "industrySectorId": this.industrySector ? this.industrySector : '0',
      "workEligibilityId" : this.workEligibility ? this.workEligibility : '0',
      "cityTown": this.cityTownValue ? this.cityTownValue : '',
      "prefereedRate": {
        "minRate": this.minRate ? this.minRate : '0',
        "maxRate": this.maxRate ? this.maxRate : '0',
        "dailyHourlyRate": this.dailyHourlyValue ? this.dailyHourlyValue : ''
      },
      "jobSpecification": this.jobSpecificationBody ? this.jobSpecificationBody : '',
      "jobSpecificationTitle": this.jobSpecificationTitle ? this.jobSpecificationTitle : '',
      "recruiterNameId": this.recruiterName ? this.recruiterName : '0',
      "saveTempleteAs": this.saveTemplateAs ? this.saveTemplateAs : '',
      "jobReference": this.jobReference ? this.jobReference : '',
      "recuriter_job_is_featured": "0",
      "jobId": this.jobPostingJobId ? this.jobPostingJobId : ''
      }
    var obj = {'jobPreviewData' : input};
    localStorage.setItem('jobPostingData', JSON.stringify(obj));
  }

}

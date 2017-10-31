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
industrySector = 0;
workEligibility = 0;
cityTownValue;
minRate: number;
maxRate: number;
dailyHourlyValue;
jobSpecificationTitle: any;
jobSpecificationBody: any;
recruiterName = 0;
saveTemplateAs;
jobReference;
input;
jobPostingDetails;
recruiterNameArray;
jobPostFlag = false;
  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.recruiterNameList();
    var localStorageData = JSON.parse(localStorage.getItem('recruiterJobData'));
    console.log("localStorageData--", localStorageData);
    if(localStorageData && localStorageData.jobId) {
      this.jobPostingData(localStorageData.jobId);
    }
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
          this.jobPostFlag = true;
          // this.response = data;
          //  this.recruiterviewProfileData = data.data;
          //   if( this.response.status === "TRUE"){
          //    //if( this.response.status === "FALSE"){
          //     this.router.navigate(['recruiter/profile']);
          //  }
         
        }
    );
  }

}

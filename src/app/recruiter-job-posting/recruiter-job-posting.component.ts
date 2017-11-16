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
postJobSuccessMsg = '';
jobPostingTiteFlag = false;
jobPostingDurationFlag = false;
startDateFlag = false;
industrySectorFlag = false;
workEliFlag = false;
templateData;
allErrorFlag = false;
renderTemmplateData;
currentTemplate = "";
cityFlag = false;
minRateFlag = false;
maxRateFlag = false;
jobSpecificationFlag = false;
WSErrorMsg = "";
  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.recruiterNameList();
    this.getIndustry();
    this.getTemplateData();
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

  // getTemplateData() {
  //    var input = {
  //    "email":"test@test7.com",
  //   "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

  //  };
  //  console.log("input--", input);
  //  var wsUrl="http://dev.contractrecruit.co.uk/contractor_site/api/post/recruiter/job/template_list";
  //      this._commonRequestService.postData(wsUrl, input).subscribe(
  //       data => {
  //         console.log("templateData--", data);
  //         this.templateData = data.data;
  //         //this.recruiterNameArray = data.data;
  //       }
  //   );
  // }

  getTemplateData() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/template_list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          this.templateData = data.data;
          console.log("templateData--", data);
        }
    );
  }

  renderTemplateDate() {
    var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
    "templateId": this.currentTemplate ? this.currentTemplate : ''
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/template_by_id";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          this.renderTemmplateData = data.data;
          console.log("templateData--", data);

       this.jobPostingJobTitle = this.renderTemmplateData.job_title;
       this.jobPostingDuration = this.renderTemmplateData.duration;
       this.startDate = this.renderTemmplateData.date_added ? this.renderTemmplateData.date_added.split(' ')[0] : '';
       this.industrySector = this.renderTemmplateData.industry;
       this.workEligibility = this.renderTemmplateData.WorkEligibility;
       this.cityTownValue = this.renderTemmplateData.show_location;
       this.minRate = this.renderTemmplateData && this.renderTemmplateData.rate_from  ? this.renderTemmplateData.rate_from : 0;
       this.maxRate = this.renderTemmplateData && this.renderTemmplateData.rate_to  ? this.renderTemmplateData.rate_to : 0
       this.dailyHourlyValue = this.renderTemmplateData && this.renderTemmplateData.rate_type ? this.renderTemmplateData.rate_type : '';
       this.jobSpecificationTitle = this.renderTemmplateData.job_title;
       this.jobSpecificationBody = this.renderTemmplateData.job_description;
       this.recruiterName = this.renderTemmplateData.recruiterNameId;
       this.saveTemplateAs = this.renderTemmplateData.template_name;
       this.jobReference = this.renderTemmplateData.jobReference;
       this.editJobId = this.renderTemmplateData.id;
       this.recruiterName = this.renderTemmplateData.consultant_id;

        }
    );
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
           this.startDate = (this.jobPostingDetails.startDate).split(' ')[0];
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

  resetData() {
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

  onJobPostSave(f:NgForm) {
    window.scroll(0,0);
    if(this.jobPostingJobTitle) {
      this.jobPostingTiteFlag = false;
    } else {
      this.jobPostingTiteFlag = true;
    }

    if(this.jobPostingDuration) {
      this.jobPostingDurationFlag = false;
    } else {
      this.jobPostingDurationFlag = true;
    }

    if(this.cityTownValue) {
      this.cityFlag = false;
    } else {
      this.cityFlag = true;
    }

    if(this.minRate) {
      this.minRateFlag = false;
    } else {
      this.minRateFlag = true;
    }

    if(this.maxRate) {
      this.maxRateFlag = false;
    } else {
      this.maxRateFlag = true;
    }

    if(this.startDate) {
      this.startDateFlag = false;
    } else {
      this.startDateFlag = true;
    }

    if(this.industrySector !== "0") {
      this.industrySectorFlag = false;
    } else {
      this.industrySectorFlag = true;
    }

    if(this.workEligibility !== "0") {
      this.workEliFlag = false;
    } else {
      this.workEliFlag = true;
    }

    if(this.jobSpecificationTitle && this.jobSpecificationBody) {
      this.jobSpecificationFlag = false;
    } else {
      this.jobSpecificationFlag = true;
    }

    if(this.jobPostingDurationFlag || this.jobPostingTiteFlag || this.startDateFlag || 
      this.industrySectorFlag || this.workEliFlag || this.cityFlag || this.maxRateFlag || this.minRateFlag
      || this.jobSpecificationFlag) {
      this.allErrorFlag = true;
    } else {
      this.allErrorFlag = false;
    }

    if(!this.allErrorFlag) {
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

        if (this.currentTemplate) {
          this.input["saveTempleteAs_id"] = this.currentTemplate;
        }

        var wsUrl;
        //alert(0);
        if(!this.jobPostingJobId) {
        console.log("this.input", this.input);
          wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/add";
             this._commonRequestService.postData(wsUrl,this.input).subscribe(
              data => {
              	console.log("data result", data);
                window.scroll(0,0);
                if(data && data.status === "TRUE") {
                  this.resetData();
                  this.postJobSuccessMsg = 'Post Job Save succesfully!';
                   var obj = {'jobId' : ''};
                  localStorage.setItem('recruiterJobData', JSON.stringify(obj));

                  var obj1 = {'jobPreviewData' : ''};
                  localStorage.setItem('editJobPost', JSON.stringify(obj1));
                } else {
                  this.WSErrorMsg = data && data.error && data.error.length > 0 ? data.error[0] : '';
                }
                }
          );
        } else {
          this.input.jobid = this.jobPostingJobId;
          wsUrl=" http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/submit/edit";
          console.log("input with job id-", this.input);
             this._commonRequestService.postData(wsUrl,this.input).subscribe(
              data => {
                console.log("data result", data);
                if(data && data.status === "TRUE") {
                   window.scroll(0,0);
                  this.resetData();
                  this.getTemplateData();
                  this.postJobSuccessMsg = 'Post Job Update succesfully!'
                  //this.jobPostFlag = false;
                  //this.router.navigate(['/recruiter/manage-jobs']);
                } else if(data && data.error){
                  //this.previewJobErrorMsg = data.error;
                  //this.jobPostFlag = true;
                  this.WSErrorMsg = data && data.error && data.error.length > 0 ? data.error[0] : '';
                }
                //this.jobPostFlag = true;
              }
          );
        }
      }
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
      "jobId": this.jobPostingJobId ? this.jobPostingJobId : '',
      "templateId": this.currentTemplate ? this.currentTemplate : ''
      }
    var obj = {'jobPreviewData' : input};
    localStorage.setItem('jobPostingData', JSON.stringify(obj));
  }

}

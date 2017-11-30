import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';
import { FormsModule,NgForm, FormControl } from '@angular/forms';
import { CommonService } from '../commonService.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-recruiter-job-posting',
  templateUrl: './recruiter-job-posting.component.html',
  styleUrls: ['./recruiter-job-posting.component.css']
})
export class RecruiterJobPostingComponent implements OnInit {

  public searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;

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
placeSearch;
autocomplete;
  constructor(private router: Router, public _commonRequestService: CommonRequestService, 
    private commonService: CommonService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.recruiterNameList();
    this.getIndustry();
    this.getTemplateData();
    this.loadLocationAutoData();
    var localStorageData = JSON.parse(localStorage.getItem('recruiterJobData'));
    console.log("localStorageData--", localStorageData);
    // if(localStorageData && localStorageData.jobId) {
    //   this.jobPostingJobId = localStorageData.jobId;
    //   this.jobPostingData(localStorageData.jobId);
    // }
     if(this.commonService.getJobIdForJobPosting()) {
       console.log("this.commonService.getJobIdForJobPosting()", this.commonService.getJobIdForJobPosting());
      this.jobPostingJobId = this.commonService.getJobIdForJobPosting();
      //this.jobPostingData(this.jobPostingJobId);
    }
    console.log("this.jobPostingJobId", this.jobPostingJobId);
    if(this.jobPostingJobId && typeof this.jobPostingJobId == 'object') {
      this.jobPostingJobTitle = this.jobPostingJobId['jobTitle'];
       this.jobPostingDuration = this.jobPostingJobId['duration'];
       this.startDate = this.jobPostingJobId['startDate'];
       this.industrySector = this.jobPostingJobId['industrySectorId'];
       this.workEligibility = this.jobPostingJobId['workEligibilityId'];
       this.cityTownValue = this.jobPostingJobId['cityTown'];
       this.minRate = this.jobPostingJobId && this.jobPostingJobId['prefereedRate'] && this.jobPostingJobId['prefereedRate'].minRate ? this.jobPostingJobId['prefereedRate'].minRate : 0;
       this.maxRate = this.jobPostingJobId && this.jobPostingJobId['prefereedRate'] && this.jobPostingJobId['prefereedRate'].maxRate ? this.jobPostingJobId['prefereedRate'].maxRate : 0
       this.dailyHourlyValue = this.jobPostingJobId && this.jobPostingJobId['prefereedRate'] && this.jobPostingJobId['prefereedRate'].dailyHourlyRate ? this.jobPostingJobId['prefereedRate'].dailyHourlyRate : '';
       this.jobSpecificationTitle = this.jobPostingJobId['jobSpecificationTitle'];
       this.jobSpecificationBody = this.jobPostingJobId['jobSpecification'];
       this.recruiterName = this.jobPostingJobId['recruiter_Id'];
       this.saveTemplateAs = this.jobPostingJobId['saveTempleteAs'];
       this.jobReference = this.jobPostingJobId['jobReference'];
       this.editJobId = this.jobPostingJobId['jobId'];
     } else if(this.jobPostingJobId){
       this.editJobId = this.jobPostingJobId;
       this.jobPostingData(this.jobPostingJobId);
     }
    var editJoblocalStorageData = JSON.parse(localStorage.getItem('editJobPost'));
    console.log("editJoblocalStorageData", editJoblocalStorageData);
    // if(editJoblocalStorageData && editJoblocalStorageData.jobPreviewData) {
    //   this.jobPostingJobTitle = editJoblocalStorageData.jobPreviewData.jobTitle;
    //    this.jobPostingDuration = editJoblocalStorageData.jobPreviewData.duration;
    //    this.startDate = editJoblocalStorageData.jobPreviewData.startDate;
    //    this.industrySector = editJoblocalStorageData.jobPreviewData.industrySectorId;
    //    this.workEligibility = editJoblocalStorageData.jobPreviewData.workEligibilityId;
    //    this.cityTownValue = editJoblocalStorageData.jobPreviewData.cityTown;
    //    this.minRate = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.minRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.minRate : 0;
    //    this.maxRate = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.maxRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.maxRate : 0
    //    this.dailyHourlyValue = editJoblocalStorageData.jobPreviewData && editJoblocalStorageData.jobPreviewData.prefereedRate && editJoblocalStorageData.jobPreviewData.prefereedRate.dailyHourlyRate ? editJoblocalStorageData.jobPreviewData.prefereedRate.dailyHourlyRate : '';
    //    this.jobSpecificationTitle = editJoblocalStorageData.jobPreviewData.jobSpecificationTitle;
    //    this.jobSpecificationBody = editJoblocalStorageData.jobPreviewData.jobSpecification;
    //    this.recruiterName = editJoblocalStorageData.jobPreviewData.recruiter_Id;
    //    this.saveTemplateAs = editJoblocalStorageData.jobPreviewData.saveTempleteAs;
    //    this.jobReference = editJoblocalStorageData.jobPreviewData.jobReference;
    //    this.editJobId = editJoblocalStorageData.jobPreviewData.jobId;
    // }
  }

  loadLocationAutoData() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log("place--", place);
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
      console.log("cityTownValue", this.cityTownValue);
    });
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
       this.recruiterName = this.renderTemmplateData.recruiter_Id;
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
         if(data && data.data && data.status == "TRUE") {
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
             this.recruiterName = this.jobPostingDetails.recruiter_Id;
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
    this.WSErrorMsg = "";
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
  			"recruiterNameId": this.recruiterName ? this.recruiterName : '',
  			"saveTempleteAs": this.recruiterName ? this.recruiterName : '',
  			"jobReference": this.jobReference ? this.jobReference : '',
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
                  this.WSErrorMsg = "";
                  this.jobPostingJobId = "";
                  this.postJobSuccessMsg = 'Post Job Save succesfully!';
                   var obj = {'jobId' : ''};
                  localStorage.setItem('recruiterJobData', JSON.stringify(obj));

                  var obj1 = {'jobPreviewData' : ''};
                  localStorage.setItem('editJobPost', JSON.stringify(obj1));
                } else {
                  this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
                }
                }
          );
        } else {
          this.input['jobid'] = this.editJobId;
          wsUrl=" http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/submit/edit";
          console.log("input with job id-", this.input);
             this._commonRequestService.postData(wsUrl,this.input).subscribe(
              data => {
                console.log("data result", data);
                if(data && data.status === "TRUE") {
                   window.scroll(0,0);
                  this.resetData();
                  this.getTemplateData();
                  this.WSErrorMsg = "";
                  this.jobPostingJobId = "";
                  this.postJobSuccessMsg = 'Post Job Update succesfully!'
                  var obj = {'jobId' : ''};
                  localStorage.setItem('recruiterJobData', JSON.stringify(obj));

                  var obj1 = {'jobPreviewData' : ''};
                  localStorage.setItem('editJobPost', JSON.stringify(obj1));
                  //this.jobPostFlag = false;
                  //this.router.navigate(['/recruiter/manage-jobs']);
                } else if(data && data.error){
                  //this.previewJobErrorMsg = data.error;
                  //this.jobPostFlag = true;
                  this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
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
      console.log("input--", input);
    var obj = {'jobPreviewData' : input};
    localStorage.setItem('jobPostingData', JSON.stringify(obj));
  }

}

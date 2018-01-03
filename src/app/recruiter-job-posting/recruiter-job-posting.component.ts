import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule,NgForm, FormControl } from '@angular/forms';
import { CommonService } from '../commonService.service';
// import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';

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
recruiterName = "";
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
postcode = '';
displayTown = '';
displayCountry = '';
displayLocationName = '';
jobSpecificationValue = '';
preferredRateFlag = false;
locationArray = [];
config;
jobPostingPreviewData;
  constructor(private router: Router, public _commonRequestService: CommonRequestService, 
    private commonService: CommonService,
    private ngZone: NgZone,
    private _routes: ActivatedRoute) {
       this.config = {toolbar : [
    //{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
    //{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    //{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
    //{ name: 'forms', groups: [ 'forms' ] },
    //'/',
    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'RemoveFormat']},
    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList']},
    //{ name: 'links', groups: [ 'links' ] },
    //{ name: 'insert', groups: [ 'insert' ] },
    // '/',
    // { name: 'styles', groups: [ 'styles' ] },
    // { name: 'colors', groups: [ 'colors' ] },
    // { name: 'tools', groups: [ 'tools' ] },
    // { name: 'others', groups: [ 'others' ] },
    // { name: 'about', groups: [ 'about' ] }
  ]};
     }

  ngOnInit() {
    window.scroll(0,0);
    this.recruiterNameList();
    this.getIndustry();
    this.getTemplateData();
    //this.loadLocationAutoData();
    var localStorageData = JSON.parse(localStorage.getItem('recruiterJobData'));
    console.log("localStorageData--", localStorageData);
    // if(localStorageData && localStorageData.jobId) {
    //   this.jobPostingJobId = localStorageData.jobId;
    //   this.jobPostingData(localStorageData.jobId);
    // }
    if (this.router.url.split('/')[2].indexOf('job-posting') > -1) {
      this._routes.queryParams.subscribe((params: Params) => {
        let paramData = params;
        console.log("params--", params);
        this.jobPostingJobId = params.jobId;
        //this.editJobId = this.jobPostingJobId;
        this.jobPostingData(this.jobPostingJobId);

      });
    }

    //  if(this.commonService.getJobIdForJobPosting()) {
    //    console.log("this.commonService.getJobIdForJobPosting()", this.commonService.getJobIdForJobPosting());
    //   this.jobPostingJobId = this.commonService.getJobIdForJobPosting();
    //   this.jobPostingData(this.jobPostingJobId);
    // }
    console.log("this.commonService.getJobIdForJobPosting()", this.commonService.getJobIdForJobPosting());
    //if(this.jobPostingJobId && typeof this.jobPostingJobId == 'object') {
      if(this.commonService.getJobIdForJobPosting()) {
        this.jobPostingPreviewData = this.commonService.getJobIdForJobPosting();
      this.jobPostingJobTitle = this.jobPostingPreviewData['jobTitle'];
       this.jobPostingDuration = this.jobPostingPreviewData['duration'];
       this.startDate = this.jobPostingPreviewData['startDate'];
       this.industrySector = this.jobPostingPreviewData['industrySectorId'];
       this.workEligibility = this.jobPostingPreviewData['workEligibilityId'];
       this.displayLocationName = this.jobPostingPreviewData['cityTown'];
       this.minRate = this.jobPostingPreviewData && this.jobPostingPreviewData['prefereedRate'] && this.jobPostingPreviewData['prefereedRate'].minRate ? this.jobPostingPreviewData['prefereedRate'].minRate : 0;
       this.maxRate = this.jobPostingPreviewData && this.jobPostingPreviewData['prefereedRate'] && this.jobPostingPreviewData['prefereedRate'].maxRate ? this.jobPostingPreviewData['prefereedRate'].maxRate : 0
       this.dailyHourlyValue = this.jobPostingPreviewData && this.jobPostingPreviewData['prefereedRate'] && this.jobPostingPreviewData['prefereedRate'].dailyHourlyRate ? this.jobPostingPreviewData['prefereedRate'].dailyHourlyRate : '';
       // this.jobSpecificationTitle = this.jobPostingPreviewData['jobSpecificationTitle'];
       // this.jobSpecificationBody = this.jobPostingPreviewData['jobSpecification'];
       this.jobSpecificationValue = this.jobPostingPreviewData['jobSpecification'];
       this.recruiterName = this.jobPostingPreviewData['recruiter_Id'];
       this.saveTemplateAs = this.jobPostingPreviewData['saveTempleteAs'];
       this.jobReference = this.jobPostingPreviewData['jobReference'];
       this.jobPostingJobId = this.jobPostingPreviewData['jobid'];
     } /*else if(this.jobPostingJobId){
       this.editJobId = this.jobPostingJobId;
       this.jobPostingData(this.jobPostingJobId);
     }*/
  }

  searchBoxBlank(){
    //alert("blank")
  }



  locationSelecetd(location) {
    this.postcode = location.postcode;
    this.displayTown = location.town_name;
    this.displayCountry = location.country;
    this.displayLocationName = location.town_name + ',' + location.country;
  }

  changeText(text){
    console.log("text--", text);
    this.postcode = "";
    this.displayTown = "";
    this.displayCountry = "";
    this.displayLocationName = "";
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
          if(data && data.status == 'TRUE') {
            this.templateData = data.data;
            //this.currentTemplate = this.templateData[0].id;
            console.log("templateData--", data);
          }
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
          if(data && data.status == 'TRUE') {
            this.renderTemmplateData = data.data;
            console.log("templateData--", data);

           this.jobPostingJobTitle = this.renderTemmplateData.job_title;
           this.jobPostingDuration = this.renderTemmplateData.duration;
           this.startDate = this.renderTemmplateData.date_added ? this.renderTemmplateData.date_added.split(' ')[0] : '';
           this.industrySector = this.renderTemmplateData.industry;
           this.workEligibility = this.renderTemmplateData.WorkEligibility;
           this.displayLocationName = this.renderTemmplateData.show_location;
           this.minRate = this.renderTemmplateData && this.renderTemmplateData.rate_from  ? this.renderTemmplateData.rate_from : 0;
           this.maxRate = this.renderTemmplateData && this.renderTemmplateData.rate_to  ? this.renderTemmplateData.rate_to : 0
           this.dailyHourlyValue = this.renderTemmplateData && this.renderTemmplateData.rate_type ? this.renderTemmplateData.rate_type : '';
           // this.jobSpecificationTitle = this.renderTemmplateData.job_title;
           // this.jobSpecificationBody = this.renderTemmplateData.job_description;
           this.jobSpecificationValue = this.renderTemmplateData.job_title + ' ' + this.renderTemmplateData.job_description;
           this.recruiterName = this.renderTemmplateData.recruiter_Id;
           this.saveTemplateAs = this.renderTemmplateData.template_name;
           this.jobReference = this.renderTemmplateData.jobReference;
           this.jobPostingJobId = this.renderTemmplateData.id;
           this.recruiterName = this.renderTemmplateData.consultant_id;
         }

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
          if(data && data.status == 'TRUE') {
            this.industryDataArray = data.data;
          } 
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
          if(data && data.status == 'TRUE') {
            this.recruiterNameArray = data.data;
            this.recruiterName = this.recruiterNameArray[0].recuriter_id;
          }
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
             //this.cityTownValue = this.jobPostingDetails.cityTown;
             //this.searchElementRef.nativeElement.value = this.jobPostingDetails.location && this.jobPostingDetails.location.display_name ? this.jobPostingDetails.location.display_name : ''; 
             this.displayLocationName = this.jobPostingDetails.location && this.jobPostingDetails.location.display_name ? this.jobPostingDetails.location.display_name : ''; 
             this.minRate = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.minRate ? this.jobPostingDetails.prefereedRate.minRate : 0;
             this.maxRate = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.maxRate ? this.jobPostingDetails.prefereedRate.maxRate : 0
             this.dailyHourlyValue = this.jobPostingDetails && this.jobPostingDetails.prefereedRate && this.jobPostingDetails.prefereedRate.dailyHourlyRate ? this.jobPostingDetails.prefereedRate.dailyHourlyRate : '';
             // this.jobSpecificationTitle = this.jobPostingDetails.jobSpecificationTitle;
             // this.jobSpecificationBody = this.jobPostingDetails.jobSpecification;
             this.jobSpecificationValue =  this.jobPostingDetails.jobSpecification;
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
     this.displayLocationName = "";
     this.minRate = 0;
     this.maxRate = 0;
     this.dailyHourlyValue = "";
     // this.jobSpecificationTitle = "";
     // this.jobSpecificationBody = "";
     this.jobSpecificationValue = "";
     this.recruiterName = "0";
     this.saveTemplateAs = "";
     this.jobReference = "";
     this.displayLocationName = "";
  }

  onJobPostSave(f:NgForm) {
//    console.log("this.searchElementRef.nativeElement.value", this.searchElementRef.nativeElement.value);
    this.WSErrorMsg = "";
    window.scroll(0,0);
    if(this.minRate > this.maxRate) {
      this.preferredRateFlag = true;
    } else {
      this.preferredRateFlag = false;
    }

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

    if(this.displayLocationName) {
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

    if(!this.jobPostingDurationFlag && !this.jobPostingTiteFlag && !this.startDateFlag && 
      !this.cityFlag) {
      if(this.jobSpecificationValue) {
        this.jobSpecificationFlag = false;
      } else {
        this.jobSpecificationFlag = true;
      }
    }

    if(this.jobPostingDurationFlag || this.jobPostingTiteFlag || this.startDateFlag || 
      this.cityFlag || this.jobSpecificationFlag || this.preferredRateFlag) {
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
  			"cityTown": this.displayLocationName ? this.displayLocationName : '',
        "postcode": this.postcode,
        "display_town" : this.displayTown,
        "display_county": this.displayCountry,
        "display_name" : this.displayLocationName ? this.displayLocationName : '',
  			"prefereedRate": {
  				"minRate": this.minRate,
  				"maxRate": this.maxRate,
  				"dailyHourlyRate": this.dailyHourlyValue
  			},
  			"jobSpecification": this.jobSpecificationValue,
  			"jobSpecificationTitle": this.jobSpecificationValue,
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
        console.log("this.jobPostingJobId", this.jobPostingJobId);
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
                  this.postJobSuccessMsg = 'Job Posted Successfully!';
                  //  var obj = {'jobId' : ''};
                  // localStorage.setItem('recruiterJobData', JSON.stringify(obj));

                  // var obj1 = {'jobPreviewData' : ''};
                  // localStorage.setItem('editJobPost', JSON.stringify(obj1));
                } else if(data && data.status == 'FALSE'){
                  this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
                }
                }
          );
        } else {
          this.input['jobid'] = this.jobPostingJobId;
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
                  this.postJobSuccessMsg = 'Job Updated succesfully!'
                  // var obj = {'jobId' : ''};
                  // localStorage.setItem('recruiterJobData', JSON.stringify(obj));

                  // var obj1 = {'jobPreviewData' : ''};
                  // localStorage.setItem('editJobPost', JSON.stringify(obj1));
                  //this.jobPostFlag = false;
                  //this.router.navigate(['/recruiter/manage-jobs']);
                } else if(data && data.status == 'FALSE'){
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
      "cityTown": this.displayLocationName ? this.displayLocationName : '',
      "prefereedRate": {
        "minRate": this.minRate ? this.minRate : '0',
        "maxRate": this.maxRate ? this.maxRate : '0',
        "dailyHourlyRate": this.dailyHourlyValue ? this.dailyHourlyValue : ''
      },
      "jobSpecification": this.jobSpecificationValue ? this.jobSpecificationValue : '',
      "jobSpecificationTitle": '',
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

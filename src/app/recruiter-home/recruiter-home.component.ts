import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';
//import { Chart } from 'angular-highcharts';
import { FormControl } from '@angular/forms';
// import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
  styleUrls: ['./recruiter-home.component.css']
})
export class RecruiterHomeComponent implements OnInit {
  public searchControl: FormControl;
  @ViewChild("homeSearch")
  public searchElementRef: ElementRef;
	listingData = [];
  pageNo = 1;
  pageLimit = 10;
  sortType = 'least';
  leastMostData;
  wsError = "";
  quickLinkData;
  jobTitleValue = "";
  locationValue = "";
  postcode = '';
  displayTown = '';
  displayCountry = '';
  displayLocationName = '';
  accountName;
  showShareProfilePopup = false;
  emailAddressValue;
  messageValue;
  addMoreDetailsFlag = false;
  accountUserFlag = false;
  userMetricsFlag = false;
  timePeriodFlag = false;
  freeTextValue = "";
  allRecruiterData;
  recruiterIdArray = [];
  // applicationCountArray = [];
  // jobCountArray = [];
  defaultArray = ['Overall Team', 'Number of Applications', 'Number of Jobs Posted', '1 Month'];
  public lineChartData:Array<any> = [];
  //  public lineChartData:Array<any> = [
  //   {data: [0, 59, 80, 81, 56, 55, 200], label: 'Series A'},
  //   {data: [0, 48, 40, 19, 86, 27, 90], label: 'Series B'},
  //   {data: [0, 48, 77, 9, 100, 27, 40], label: 'Series C'},
  // ];
   //lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    scaleShowVerticalLines: true,
      scales: {
      yAxis: [{
        ticks: {
          beginAtZero: true,
          color: "#ff0000"
        }
      }]
    }
  };
  public lineChartColors:Array<any> = [
    { // grey
      //backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      //backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      //backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public randomize():void {
    // let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    // for (let i = 0; i < this.lineChartData.length; i++) {
    //   _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //   for (let j = 0; j < this.lineChartData[i].data.length; j++) {
    //     _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //   }
    // }
    // this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService, private _commonService: CommonService,
    private ngZone: NgZone, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0,0);
    let localStorageData = localStorage.getItem("loginDetail") ?  JSON.parse(localStorage.getItem("loginDetail")) : ""; 
    this.accountName = localStorageData && localStorageData.name ? localStorageData.name : '';
    this.getAllRecruiterName();
    this.getQuickLinksData();
    this.getMapData();
    //this.loadLocationAutoData();
       
    this.getGraphData();
  	//this.getRecruiterCount();
  	this.getMostLeastJobs('least');
  }

  ngAfterViewInit() {
    //this.loadLocationAutoData();
  }

  shareProfile() {
    this.showShareProfilePopup = true;
  }

  closePopup() {
    this.showShareProfilePopup = false;
  }

  removeGraphItem(index) {
    this.defaultArray.splice(index, 1);
    this.getGraphData();
  }

  reflectionOnGraph(item, value) {
    console.log("value--", value);
    if(value) {
      if(item && item['recuriter_contact_name'] && this.defaultArray.indexOf(item['recuriter_contact_name']) == -1) {
        let index = this.defaultArray.indexOf('Overall Team');
        this.defaultArray.splice(index, 1);
        this.defaultArray.push(item['recuriter_contact_name']);
        this.recruiterIdArray.push(item['recuriter_id']);
      }
      if(value > -1) {
        this.defaultArray.splice(value, 1);
        this.defaultArray.push(item);
      }
    } else {
      if(this.defaultArray.indexOf(item) == -1) {
        this.defaultArray.push(item);
      }
    }
    this.getGraphData();
    console.log("this.defaultArray", this.defaultArray);
  }

  shareProfileClick() {
    window.scroll(0,0);
    this.wsError = "";
   var input = {
     "email":"dharmendar.rao8@gmail.com",
    "loginToken":"$2y$10$nyBeG9Hdkxz0de.4zJGYIu2w6tAkrPWcgRXIGhadURWzhAT1/buem",
    "send_to": this.emailAddressValue,
    "message": this.messageValue ? this.messageValue : ''

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/send_profile_by_email";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("share profile data", data);
         if(data && data.status === "TRUE") {
           this.emailAddressValue = "";
           this.messageValue = "";
           this.showShareProfilePopup = false;
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
              this.showShareProfilePopup = false;
            }
          }
        }
    );
  }

  passJobId(id) {
  	//this._commonDataSharedService.manageJobsJobId.next(id);
  	// var obj = {'jobId' : id};
   //  localStorage.setItem('recruiterJobData', JSON.stringify(obj));
   //this._commonService.setJobIdForJobPosting(id);
   var jobId = {
      "jobId": id
    }
    this.router.navigate(['/recruiter/recruiter-home'], { skipLocationChange: true }).then(() =>
     this.router.navigate(['/recruiter/job-posting'], { 'relativeTo': this.activateRoute, queryParams :  jobId} )
     );
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
    if(typeof text !== 'object') {
      this.freeTextValue = text;
    }
    this.postcode = "";
    this.displayTown = "";
    this.displayCountry = "";
    this.displayLocationName = "";
  }

  // chart = new Chart({
  //     chart: {
  //       type: 'line'
  //     },
  //     title: {
  //       text: 'Linechart'
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     series: [{
  //       name: 'Line 1',
  //       data: [1, 2, 3]
  //     }]
  //   });


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

  getAllRecruiterName() {
    this.wsError = "";
   var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$WGsOK7LOBpmlMgYPI/3W6eHI0bZf.YW6mS2WxGNlTDcWXAnhNY3Be"
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/all_user_for_dashboard";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("all users data", data);
         if(data && data.status === "TRUE") {
           this.allRecruiterData = data.data;
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
        }
    );
  }

  getGraphData() {
    this.wsError = "";
   var input = {
    "email":"test@test7.com",
    "loginToken":"$2y$10$4li93s8LmXXJ52bCsoIFwO/xtDfrAFAwh4novW7AZovPk8lRfivvK",
    "overall_team": 0,
    "number_applications":this.defaultArray.indexOf('Number of Applications') > -1 ? 1 : 0,
    "job_posted":this.defaultArray.indexOf('Number of Jobs Posted') > -1 ? 1 : 0,
    "job_viewed":0,
    "recruiter_id":this.defaultArray.indexOf('Overall Team') > -1 ? 0 : this.recruiterIdArray.toString().trim(),
    "month": this.defaultArray.indexOf('3 Months') > 0 ? "3" : "1"
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/deashboard_graph";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("Graph data", data);
         if(data && data.status === "TRUE") {
          this.lineChartLabels = [];
            let applicationArray = [];
            let JobPostArray = [];
            if(data && data.data && data.data.application_counts && data.data.application_counts.length > 0 && Object.keys(data.data).indexOf("application_counts") > 0) {
              applicationArray = data.data.application_counts.map(o => {
                return o.count;
              });
            }
            if(data && data.data && data.data.job_counts && data.data.job_counts.length > 0 && Object.keys(data.data).indexOf("job_counts") > 0) {
              JobPostArray = data.data.job_counts.map(o => {
                return o.count;
              });
            }
            // console.log("this.lineChartData", this.lineChartData);
            // console.log("applicationArray", applicationArray);
            // console.log("JobPostArray", JobPostArray);
            this.lineChartData = [
              {data: applicationArray, label: 'application_counts'},
              {data: JobPostArray, label: 'job_counts'}
            ]
            console.log("this.lineChartData", this.lineChartData);
            if(data && data.data && (data.data.job_counts && data.data.job_counts.length > 0 || data.data.application_counts && data.data.application_counts.length > 0)) {
              this.lineChartLabels = data.data.job_counts.map(o => {
                if(o && o.date){
                  return o.date;
                } else if(o && o.month) {
                  return o.month;
                }
              });
            }
            console.log("this.lineChartLabels", this.lineChartLabels);
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
        }
    );
  }

  getMapData() {
    this.wsError = "";
   var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$QTgvT3EZ2c9nejMN0nXQyukZflChwM.qqcp1n.sdXvE8kRMMleJ.e",
    "month":"1",
    "recruiter_id":"0",
    "number_of_application":"1",
    "number_of_job_posted":"1",
    "number_of_job_viewed":"1"
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/state_user_and_application";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("map data", data);
         if(data && data.status === "TRUE") {
           //this.quickLinkData = data.data;
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
        }
    );
  }

  // showMoreJobs() {
  //   // var pageNo = 1;
  //   // pageNo += 1;
  //   this.pageNo += 1;
  //   //this.pageLimit = this.pageLimit * this.pageNo;
  //   console.log("this.pageLimit", this.pageLimit)
  //   this.getMostLeastJobs(this.sortType)
  // }

  searchResultHomePage() {
    var savedSearchSaveJson = {
      // "email":"test@test8.com",
      // "loginToken":"$2y$10$id2kG9VqsF.lID3xkphOfOqCXO.nrVDxyrt4JhrBKEoXEr2yrxX.y",
      // "recuriter_saved_search_name":this.savedSearchName,
      // "recuriter_search_add_to_watchdog":this.addToWatchDogCheck === true ? 1 : 2,
      "recuriter_search_job_title":this.jobTitleValue?this.jobTitleValue:'',
      "recuriter_search_keywords":'',
      "recuriter_search_stemmed_terms":0,
      "recuriter_search_core_skills":'',
      "recuriter_search_certifications":'',
      "recuriter_search_dont_show_to_contractor":'',
      "recuriter_search_location": this.displayLocationName ? this.displayLocationName : this.freeTextValue,
      "recuriter_search_include_relocators":0,
      "recuriter_search_by_rate_min": '',
      "recuriter_search_by_rate_max": '',
      "recuriter_search_by_rate_type": '',
      "recuriter_search_by_time_left": '',
      "recuriter_search_by_unavailable": 0,
      "recuriter_search_by_updated_contractor_since": '',
      "recuriter_search_by_contract_name": '',
      "recuriter_search_by_education": "",
      "recuriter_search_by_industry": "",
      "recuriter_search_by_security_clearance": "",
      "recuriter_search_by_driving_license": 0,
      "postcode": this.postcode ? this.postcode : '',
      "display_town" : this.displayTown ? this.displayTown : '',
      "display_county": this.displayCountry ? this.displayCountry : '',
      "display_name" : this.displayLocationName ? this.displayLocationName : this.freeTextValue
      //"page":1,
      //"limit":12
      //"sort":8
    }

   // if(this.router.url.indexOf("/recruiter/advanced-search") >= 0) {
      //this.router.navigate(['/recruiter/searchresult-loggedin']);
      this.router.navigate(['/recruiter/recruiter-home'], { skipLocationChange: true }).then(() =>
        this.router.navigate(['/recruiter/searchresult-loggedin'], { 'relativeTo': this.activateRoute, queryParams :  savedSearchSaveJson} )
      );
    //} 

    // this._commonService.setSearchResult(savedSearchSaveJson);
    // this.router.navigate(['/recruiter/searchresult-loggedin']);
  }

}

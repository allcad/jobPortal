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
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService, private _commonService: CommonService,
    private ngZone: NgZone, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    let localStorageData = localStorage.getItem("loginDetail") ?  JSON.parse(localStorage.getItem("loginDetail")) : ""; 
    this.accountName = localStorageData && localStorageData.name ? localStorageData.name : '';
    this.getQuickLinksData();
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
   this._commonService.setJobIdForJobPosting(id);
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

  getGraphData() {
    this.wsError = "";
   var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$QTgvT3EZ2c9nejMN0nXQyukZflChwM.qqcp1n.sdXvE8kRMMleJ.e",
    "overall_team":1,
    "number_applications":1,
    "job_posted":1,
    "job_viewed":1,
    "date":"2017-11"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin//api/post/recruiter/deashboard_graph";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("Graph data", data);
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
      "recuriter_search_location": this.displayLocationName ? this.displayLocationName : '',
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
      "display_name" : this.displayLocationName ? this.displayLocationName : ''
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

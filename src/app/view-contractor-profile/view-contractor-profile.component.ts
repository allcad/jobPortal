import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-view-contractor-profile',
  templateUrl: './view-contractor-profile.component.html',
  styleUrls: ['./view-contractor-profile.component.css']
})
export class ViewContractorProfileComponent implements OnInit {

  	errorMsgFlag;
	contractorData;;
	errorMsg
	currentContractorId;
	currentContractorFirstName;
	currentContractorLastName;
	certification = [];
	keySkills = [];
  type;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  qualification = [];
  map;
  showShareProfileBox = false;
  showSearchOptionFlag = false;
  emailContractor;
  messageValue;
  emailValueFlag = false;
  successMessageFlag = false;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService,
    private ngZone: NgZone, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0,0);
    this.zoom = 3;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    if (this.router.url.split('/')[2].indexOf('view-contractor-profile') > -1) {
      this.activateRoute.queryParams.subscribe((params: Params) => {
        let paramData = params;
        console.log("params--", params);
        let output = {};        

        let keyArray = []
        for (let prop in paramData) {
            keyArray.push(prop); 
        }
        console.log("keyArray--", keyArray);

        for(let i=0; i<keyArray.length; i++){
          
          output[keyArray[i]] = paramData[keyArray[i]] && paramData[keyArray[i]].indexOf('+')>-1 ? paramData[keyArray[i]].replace(/\+/g, ' ') : paramData[keyArray[i]];
        }
         this.currentContractorId = output['contractorId'];
        this.getContractorData();
        console.log("jbdjasd",output);

      });
    }

  	// this.currentContractorId = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorId'] : null;
	  // console.log("this.currentContractorId", this.currentContractorId);
  	// this.getContractorData();

  }

  getContractorData() {
  	let input = {
       "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
  		"contractor_reg_id":this.currentContractorId
  	};
  	var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/view/globel";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("contractor data--", data);
         if(data && data.status === "TRUE") {
           this.errorMsgFlag = false;
           this.contractorData = data.data;
           this.certification = data && data.data['certification'] ? data.data['certification'].split(","):'';
           this.keySkills = data && data.data['skill&Experience'] ? data.data['skill&Experience'].split(","):[];
           this.qualification = data && data.data['qualification'] ? data.data['qualification'].split(',') : [];
           console.log("this.certification", this.certification);
           console.log("this.keySkills", this.keySkills);
           //this.currentContractorFirstName = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorName'] : null;  	
           this.currentContractorFirstName = this.contractorData && this.contractorData.userName ? this.contractorData.userName : ''; 
	         this.latitude = this.contractorData.latitude;
           this.longitude = this.contractorData.longitude;
           this.initializeMap();
           //this.zoom = 3;
           console.log("this.latitude", this.latitude, "this.longitude", this.longitude);
           
           //this.setCurrentPosition(this.latitude, this.longitude)
           //this.currentContractorLastName = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorLastName'] : null;  	
           
          } else {
            if(data && data.error && data.error.length > 0) {
            this.errorMsgFlag = true;
              this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
        }
    );
  }

  initializeMap() {
    console.log("this.latitude", this.contractorData.latitude, "this.longitude", this.contractorData.longitude);
    this.map = new google.maps.Map(document.getElementById('viewContractorProfile'), {
      center: { lat: Number(this.contractorData.latitude), lng: Number(this.contractorData.longitude) },
      zoom: 3
    });

    var marker = new google.maps.Marker({
      position: { lat:Number(this.contractorData.latitude), lng: Number(this.contractorData.longitude) }
    });
    marker.setMap(this.map);
    //this.drawExistingMap();
  }

  watchContractor() {
      var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "contractor_id":this.currentContractorId,
      "Job_id":0,
      "notify":"all"


   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_add";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("add watch list--", data);
         // this.getWatchDogListData(this.pageNo);
          this.router.navigate(['./recruiter/watch-list']);
        }
    );
  }

  unwatchContractor() {
      var input = {
     "email":"test@test7.com",
      "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
      "watch_id":this.contractorData && this.contractorData.watch_id ? this.contractorData.watch_id : ''
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/watch_delete";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("unwatch--", data);
         //this.unwatchPopupFlag = false;
         // this.getWatchDogListData(this.pageNo);
          this.router.navigate(['./recruiter/watch-list']);
        }
    );
  }

  shareContractorProfile() {
    this.errorMsg = "";
    if(this.emailContractor) {
      this.emailValueFlag = false;
    } else {
      this.emailValueFlag = true;
    }
      var input = {
       "email":"test@test7.com",
        "loginToken":"$2y$10$ERdO743JuPZF6a4SfV8HQe69MqBJBtM3o3cz.ChfrZbcySNegW1e6",
        "contractor_id":this.currentContractorId,
        "send_to": this.emailContractor,
        "message" : this.messageValue

   };
   console.log("input--", input);
   if(!this.emailValueFlag) {
     var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/send_contractor_by_email";
         this._commonRequestService.postData(wsUrl,input).subscribe(
          data => {
           console.log("unwatch--", data);
           if(data && data.status == 'TRUE') {
             this.errorMsg = "";
             this.successMessageFlag = true;
           } else if(data && data.status == 'FALSE'){
             this.successMessageFlag = false;
               this.errorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
      );
    }
  }
  

  moveToAnotherPage() {
    this.type = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['type'] : null;    
    if(this.type === 'viewApplication') {
      this.router.navigate(['./recruiter/view-applications']);
    } else if(this.type === 'watchList') {
      this.router.navigate(['./recruiter/watch-list']);
    } else if(this.type === 'search-result') {
      this.router.navigate(['./recruiter/searchresult-loggedin']);
    }
  }

  goToSearchResultPage() {
    var savedSearchSaveJson = {
      "recuriter_search_job_title":"",
      "recuriter_search_keywords":'',
      "recuriter_search_stemmed_terms":0,
      "recuriter_search_core_skills":'',
      "recuriter_search_certifications":'',
      "recuriter_search_dont_show_to_contractor":'',
      "recuriter_search_location": "",
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
      "postcode": "",
      "display_town" : "",
      "display_county": "",
      "display_name" : ""
    }
      this.router.navigate(['/recruiter/recruiter-home'], { skipLocationChange: true }).then(() =>
        this.router.navigate(['/recruiter/searchresult-loggedin'], { 'relativeTo': this.activateRoute, queryParams :  savedSearchSaveJson} )
      );
  }

}

import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.zoom = 3;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

  	this.currentContractorId = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorId'] : null;
	  console.log("this.currentContractorId", this.currentContractorId);
  	this.getContractorData();

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
           this.currentContractorFirstName = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorName'] : null;  	
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

  

  // private setCurrentPosition(latitude, longitude) {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = latitude;
  //       this.longitude = longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }

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

}

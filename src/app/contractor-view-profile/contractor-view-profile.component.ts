import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
@Component({
  selector: 'app-contractor-view-profile',
  templateUrl: './contractor-view-profile.component.html',
  styleUrls: ['./contractor-view-profile.component.css']
})
export class ContractorViewProfileComponent implements OnInit {
 profileData;
 industrySectorData = [];
 skillArray = [];
 securityClearenceData; 
 lat: number = 57.653484;
  lng: number =-3.335724;
  polygonPath = [{ lng: this.lng + 0.3, lat: this.lat + 0.3 },
      { lng: this.lng + 0.5, lat: this.lat + 0.3 },
      { lng: this.lng + 0.9, lat: this.lat + 0.9 },];
 constructor(public _commonRequestService: CommonRequestService,) { }

  ngOnInit() {
  this.getSecurityClearenceData();
  this.getIndustrySectorData();
  this.getProfileDta();
  }

getProfileDta(){
  var inputJson = {
      "email":"johnsmith21@gmail.com",
      "loginToken":"$2y$10$Wbps5L/ERbs.7sdCm.tAoO4tNWY6At/JtAibo6FhsoICKXUy4q7OS"
    }
	 let dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/view";
       this._commonRequestService.postData(dataUrl, inputJson).subscribe(
        data => {
          console.log("profile", data.data)
          this.profileData = data.data;
          this.skillArray  = this.profileData['skill&Experience'];
          console.log("this.skillArray", this.skillArray);
          this._commonRequestService.setDataWithoutObserval(this.profileData, "contractorProfileData")
        }
    );
}

getSecurityClearenceData(){
    let URL ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/security_clearance";
       this._commonRequestService.getData(URL).subscribe(
        data => {
          this.securityClearenceData = data.data;
       
        }
    );
  }

  getSecurityClearnceName(profileData){
    if(profileData.securityClearance){
      for(let i=0; i<this.securityClearenceData.length; i++){
        if(profileData.securityClearance == this.securityClearenceData[i].id){
          return this.securityClearenceData[i].name;
        }
      }
      return "";
    }
  }

  getIndustrySectorData(){
    let URL ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
       this._commonRequestService.getData(URL).subscribe(
        data => {
          this.industrySectorData = data.data;
       
        }
    );
  }

  getIndustrySectorName(industrySector){
    if(industrySector){
      for(let i=0; i<this.industrySectorData.length; i++){
        if(industrySector == this.industrySectorData[i].id){
          return this.industrySectorData[i].industry;
        }
      }
      return "";
    }
  }
}

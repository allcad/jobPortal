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
 lat: number = 26.9124;
  lng: number = 75.7873;
  polygonPath = [{ lng: this.lng + 0.3, lat: this.lat + 0.3 },
      { lng: this.lng + 0.5, lat: this.lat + 0.3 },
      { lng: this.lng + 0.9, lat: this.lat + 0.9 },];
 constructor(public _commonRequestService: CommonRequestService,) { }

  ngOnInit() {
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
          this._commonRequestService.setDataWithoutObserval(this.profileData, "contractorProfileData")
        }
    );
}
}

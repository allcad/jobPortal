import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonRequestService } from '../common-request.service';
@Component({
  selector: 'app-contractor-view-profile',
  templateUrl: './contractor-view-profile.component.html',
  styleUrls: ['./contractor-view-profile.component.css']
})
export class ContractorViewProfileComponent implements OnInit {
  profileUrl: string;
  userName: string;
  emailAddress;
  securityClearance;
  euDrivingLicence;
  postCode;
  dayRate1;
  dayRate2;
  availability: string;
  webAddress: string;
  stackOverWebAdd: string;
  gitHubWebAdd: string;
  linkedinWebAdd: string;
  behanceWebAdd: string;
  preferredJobTitle: string;
  commutableValue: number;
  rate1;dataUrl;
skillData;
  rate2;
  dailyHourlyValue;profileData;
  currentJobTitle: string;
  summary: string;
  certification: string;
  qualification: string;
  preferredJobTitleValue: string;
  currentPassword;
  newPassword;fileUploadForCV;
fileUploadForCover;
  confirmNewPassword;contractorProfileJson;inputUrl;responseData;succesMessageFlag =false;fileUpload;
ErrorMesageFlag=false;
 constructor(public _commonRequestService: CommonRequestService,) { }

  ngOnInit() {
  this.getProfileDta();
  }

getProfileDta(){
	 this.profileData =  this._commonRequestService.getDataWithoutObserval('contractor-profile-view-data');
	 
	console.log(this.profileData,"view_data");
}
}

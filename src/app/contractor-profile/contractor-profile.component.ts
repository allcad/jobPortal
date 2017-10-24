import { Component, OnInit,NgModule } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.css']
})
export class ContractorProfileComponent implements OnInit {
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
 constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getKeySkillData()
    this.getProfileDta()
  }

  contractorFileChangeEvent(fileInput: any) {
     var reader = new FileReader();
    var readerByte = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event:any) => {
      var arrayBuffer = reader.result;
      this.profileUrl = arrayBuffer;
    }
  }

  saveContractorProfile(form: NgForm) {
      var inputdata = {
      "loginToken":"$2y$10$Wbps5L/ERbs.7sdCm.tAoO4tNWY6At/JtAibo6FhsoICKXUy4q7OS",
      'contractorProfileUrl': this.profileUrl,
      'userName': this.userName,
      'email': this.emailAddress,
      'securityClearance': this.securityClearance,
      'euDrivingLicence': this.euDrivingLicence,
      'postCode': this.postCode,
      'dayRate': this.dayRate1 + '- ' + this.dayRate2,
      'availability': this.availability,
      'webAddress': this.webAddress,
      'stackOverWebAddress': this.stackOverWebAdd,
      'gitHubWebAddress': this.gitHubWebAdd,
      'linkedinWebAddress': this.linkedinWebAdd,
      'behanceWebAddress': this.behanceWebAdd,
      'yourPreferredJobTitle': this.preferredJobTitle,
      'commutable': this.commutableValue,
      'rate': this.rate1 + '- ' + this.rate2,
      'dailyHourlyValue': this.dailyHourlyValue,
      'currentJobTitle': this.currentJobTitle,
      'skill&Experience': ["1","2","3"],
      'summary': this.summary,
      'industrySector': ["1",],
      'certification': this.certification,
      'qualification': this.qualification,
      'preferredJobTitle': this.preferredJobTitleValue,
      'uploadCV':this.fileUploadForCV,
      'uploadCoverLetter':this.fileUploadForCover,
    }
          console.log( inputdata,"fdf")
   this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/submit";
       this._commonRequestService.postData(this.inputUrl, inputdata).subscribe(
        data => {
          this.responseData = data;
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          this.profileData={};
          }
          else{
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
              // this.responseData.status=""
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    ); 
  }

  accountDetailsSave() {
   // alert(121)
    var accountJson = {
      "email":  this.profileData.emailAddress,
      "loginToken":"$2y$10$1T6dX9rw93MoWgTKQmyNSeiyR43jwrXvOdFHYcWuXLD9oASXEx8vi",  
      'newPassword': this.newPassword,
       "oldPassword":this.currentPassword,
      'confirmPassword': this.confirmNewPassword
    }
              console.log(accountJson,"fdf")
   this.inputUrl=" http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/password";
       this._commonRequestService.postData(this.inputUrl, accountJson).subscribe(
        data => {
          this.responseData = data;
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          this.profileData={};
          }
          else{
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
              // this.responseData.status=""
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    );
  }
  getKeySkillData() {
   this.dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/contractre/skillist";
       this._commonRequestService.getData(this.dataUrl).subscribe(
        data => {
          this.skillData = data.data;
       
        }
    );


  }


getProfileDta(){
   this.profileData =  this._commonRequestService.getDataWithoutObserval('contractor-profile-view-data');
   this.profileUrl= this.profileData.profileUrl;
   this.emailAddress= this.profileData.emailAddress;
   this.securityClearance= this.profileData.securityClearance;
   this.euDrivingLicence= this.profileData.euDrivingLicence;
   this.postCode= this.profileData.postCode;
   // this.dayRate= this.profileData.userName;
   this.availability= this.profileData.availability;
   this.webAddress= this.profileData.webAddress;
   this.stackOverWebAdd= this.profileData.stackOverWebAddress;  
    this.gitHubWebAdd= this.profileData.gitHubWebAddress; 
      this.linkedinWebAdd= this.profileData.linkedinWebAddress; 
        this.behanceWebAdd= this.profileData.behanceWebAddress;
           this.preferredJobTitle= this.profileData.yourPreferredJobTitle;   
           this.commutableValue= this.profileData.commutable;  
            // this.rate= this.profileData.rate; 
              this.dailyHourlyValue= this.profileData.dailyHourlyValue; 
                this.currentJobTitle= this.profileData.currentJobTitle;
   // this.skillExperience= this.profileData.currentJobTitle;  
    this.summary= this.profileData.summary;   
    // this.industrySector= this.profileData.industrySector;  
     this.certification= this.profileData.certification; 
       this.qualification= this.profileData.qualification;  
        this.preferredJobTitle= this.profileData.preferredJobTitleValue;  
         this.fileUploadForCV= this.profileData.uploadCV;
   this.fileUploadForCover= this.profileData.uploadCoverLetter;



  console.log(this.profileData,"view_data");
}
  fileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    var readerByte = new FileReader();
    this.fileUploadForCV =fileInput.target.files[0];
     this.fileUploadForCover =fileInput.target.files[0];
      // this.fileUpload =fileInput.target.files[0];
    reader.readAsDataURL(fileInput.target.files[0]);
    console.log(this.fileUploadForCV,this.fileUploadForCover,"file_select2")

    
  }

}
//

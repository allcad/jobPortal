import { Component, OnInit,NgModule } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.css']
})
export class ContractorProfileComponent implements OnInit {
  lat: number = 26.9124;
  lng: number = 75.7873;
  polygonPath = [];
  selectedSkill;
  selectedSkillArray = [];
  selectedSkillObject;
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
  preferredJobTitleValue: string;commutable;
  currentPassword;
  newPassword;fileUploadForCV;
  fileUploadForCover;
  confirmNewPassword;contractorProfileJson;inputUrl;responseData;succesMessageFlag =false;fileUpload;industrySector;
ErrorMesageFlag=false;
fd;
imageFile;
CVFile;
coverLetterFile;
contratorCVList = [{id:1, result: null}];
coverLetterList = [{id:1, result: null}];
industrySectorData = [];
securityClearenceData = [];
 constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getKeySkillData();
    this.getIndustrySector();
    this.getSecurityClearenceData();
    this.getProfileDta()
  }


  drawPloygon(){
    this.polygonPath = [
      { lng: this.lng + 0.3, lat: this.lat + 0.3 },
      { lng: this.lng + 0.5, lat: this.lat + 0.3 },
      { lng: this.lng + 0.9, lat: this.lat + 0.9 },
  ]
  }

  contractorImageFileChangeEvent(fileInput: any) {
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.profileUrl = reader.result;
    }

    this.imageFile = fileInput.target.files[0];
    reader.readAsDataURL(this.imageFile);

    
                


  }
  contractorCoverLetterFileChangeEvent(fileInput: any){
    this.coverLetterFile = fileInput.target.files[0];
  }

  contractorCVFileChangeEvent(fileInput){
    this.CVFile = fileInput.target.files[0];
  }

  // uploadFile(){
  //   this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/getfilebyte";
  //      this._commonRequestService.postData(this.inputUrl, this.fd).subscribe(
  //       data => {
  //         console.log(data);
  //       }
  //   ); 
  // }

  saveContractorProfile(form: NgForm) {
    console.log(this.polygonPath);

    this.fd = new FormData();
    this.fd.append('token',(localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).token )? JSON.parse(localStorage.getItem('loginDetail')).token:  "nsakdlallas1232mk123b2k1390iq2ekq");
    this.fd.append('email',(localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).email )? JSON.parse(localStorage.getItem('loginDetail')).email:  "test@gmail.com");
    this.fd.append('contractorProfileUrl',this.imageFile);
    this.fd.append('userName',this.userName);
    this.fd.append('emailAddress',this.emailAddress);
    this.fd.append('securityClearance',this.securityClearance);
    this.fd.append('euDrivingLicence',parseInt(this.euDrivingLicence));
    this.fd.append('postCode',this.postCode);
    this.fd.append('dayRate_min',this.dayRate1);
    this.fd.append('dayRate_max',this.dayRate2);
    this.fd.append('availability',this.availability);
    this.fd.append('webAddress',this.webAddress);
    this.fd.append('stackOverWebAddress',this.stackOverWebAdd);
    this.fd.append('gitHubWebAddress',this.gitHubWebAdd);
    this.fd.append('linkedinWebAddress',this.linkedinWebAdd);
    this.fd.append('behanceWebAddress',this.behanceWebAdd);

    this.fd.append('yourPreferredJobTitle',this.preferredJobTitleValue);
    this.fd.append('commutable',this.commutable);
    this.fd.append('rate_min',this.rate1);

    this.fd.append('rate_max',this.rate2);

    this.fd.append('dailyHourlyValue',this.dailyHourlyValue);

    this.fd.append('currentJobTitle',this.currentJobTitle);

    this.fd.append('skill&Experience',this.selectedSkillArray);

    this.fd.append('summary',this.summary);

    this.fd.append('industrySector',this.industrySector);

    this.fd.append('certification',this.certification);
    this.fd.append('qualification',this.qualification);
    this.fd.append('uploadCV',this.CVFile);
    this.fd.append('uploadCoverLetter',this.coverLetterFile);







    //   var inputdata = {
    //   "email":"you@gmail.com",
    //   "loginToken":"$2y$10$Wbps5L/ERbs.7sdCm.tAoO4tNWY6At/JtAibo6FhsoICKXUy4q7OS",
    //   'contractorProfileUrl': this.fd ? this.fd : null ,
    //   'userName': this.userName,
    //   'emailAddress': this.emailAddress,
    //   'securityClearance': this.securityClearance,
    //   'euDrivingLicence': parseInt(this.euDrivingLicence), 
    //   'postCode': this.postCode,
    //   'dayRate_min': this.dayRate1,
    //   'dayRate_max': this.dayRate2,
    //   'availability': this.availability,
    //   'webAddress': this.webAddress,
    //   'stackOverWebAddress': this.stackOverWebAdd,
    //   'gitHubWebAddress': this.gitHubWebAdd,
    //   'linkedinWebAddress': this.linkedinWebAdd,
    //   'behanceWebAddress': this.behanceWebAdd,
    //   'yourPreferredJobTitle': this.preferredJobTitleValue,
    //   'commutable': this.commutable,
    //   'rate_min' : this.rate1,
    //   'rate_max' : this.rate2,
    //   'dailyHourlyValue': this.dailyHourlyValue,
    //   'currentJobTitle': this.currentJobTitle,
    //   'skill&Experience': this.selectedSkillArray,
    //   'summary': this.summary,
    //   'industrySector': ["1",],
    //   'certification': this.certification,
    //   'qualification': this.qualification,
    //  //'preferredJobTitle': this.preferredJobTitleValue,
    //   'uploadCV':{},
    //   'uploadCoverLetter':{},
    // }
          //console.log( inputdata,"fdf")
   this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/submit";
       this._commonRequestService.postData(this.inputUrl, this.fd).subscribe(
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
      "email":  "you@gmail.com",
      "loginToken":"$2y$10$1T6dX9rw93MoWgTKQmyNSeiyR43jwrXvOdFHYcWuXLD9oASXEx8vi",  
      'newPassword': this.newPassword,
      "oldPassword":this.currentPassword,
      'confirmPassword': this.confirmNewPassword
    }
   this.inputUrl=" http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/password";
       this._commonRequestService.postData(this.inputUrl, accountJson).subscribe(
        data => {
          this.responseData = data;
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          }
          else{
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
           
          }
    
          
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

  selectSkill(){
    if(this.selectedSkill){
      this.selectedSkillObject = this.getSkillObjectById(this.selectedSkill);  
    }
    
  }

  addSkill(){
    if(this.selectedSkillObject && this.selectedSkillArray.indexOf(this.selectedSkillObject) == -1){
      this.selectedSkillArray.push(this.selectedSkillObject);
      this.selectedSkill = "";
    }
    
  }

  removeSelectedSkill(index){
    this.selectedSkillArray.splice(index, 1);
  }

  getSkillObjectById(skill_id){
    for(var i=0; i<this.skillData.length; i++){
      if(this.skillData[i].skill_id == skill_id){
        return this.skillData[i];
      }
    }
  }


getProfileDta(){
   this.profileData =  this._commonRequestService.getDataWithoutObserval('contractorProfileData');
   if(this.profileData){
       this.setProfileData()
   } else{
     var inputJson = {
      "email":"johnsmith21@gmail.com",
      "loginToken":"$2y$10$Wbps5L/ERbs.7sdCm.tAoO4tNWY6At/JtAibo6FhsoICKXUy4q7OS"
    }
   let dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/view";
       this._commonRequestService.postData(dataUrl, inputJson).subscribe(
        data => {
          console.log("profiledtaa",data.data)
          this.profileData = data.data;
          this.setProfileData();
          this._commonRequestService.setDataWithoutObserval(this.profileData, "contractorProfileData")
        }
    );
   }
  }



  setProfileData(){
    this.userName = this.profileData.userName;
   this.profileUrl= this.profileData.profileUrl;
   this.emailAddress= this.profileData.emailAddress;
   this.securityClearance= this.profileData.securityClearance;
   this.euDrivingLicence= this.profileData.euDrivingLicence;
   this.postCode= this.profileData.postCode;
   this.dayRate1 = this.profileData.dayRate_min;
   this.dayRate2 = this.profileData.dayRate_max;
   this.availability= this.profileData.availability;
   this.webAddress= this.profileData.webAddress;
   this.stackOverWebAdd= this.profileData.stackOverWebAddress;  
   this.gitHubWebAdd= this.profileData.gitHubWebAddress; 
   this.linkedinWebAdd= this.profileData.linkedinWebAddress; 
   this.behanceWebAdd= this.profileData.behanceWebAddress;
   this.preferredJobTitleValue= this.profileData.yourPreferredJobTitle;   
   this.commutable= this.profileData.commutable;  
   this.rate1 = this.profileData.rate_min;
   this.rate2 = this.profileData.rate_max;
   this.dailyHourlyValue= this.profileData.dailyHourlyValue; 
   this.currentJobTitle= this.profileData.currentJobTitle;
   this.summary= this.profileData.summary;   
    this.certification= this.profileData.certification; 
    this.qualification= this.profileData.qualification;  
    this.fileUploadForCV= this.profileData.uploadCV;
    this.fileUploadForCover= this.profileData.uploadCoverLetter;
    this.industrySector = this.profileData.industrySector;
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

  addAnotherCV(){
    this.contratorCVList.push({id : this.contratorCVList.length+1, result: null})
  }

  removeElement(array, index){
    array.splice(index,1);
  }

  addAnotherCoverLetter(){
    this.coverLetterList.push({id : this.coverLetterList.length+1, result: null})
  }

  getIndustrySector(){
    this.dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
       this._commonRequestService.getData(this.dataUrl).subscribe(
        data => {
          this.industrySectorData = data.data;
       
        }
    );
  }

  getSecurityClearenceData(){
    this.dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/security_clearance";
       this._commonRequestService.getData(this.dataUrl).subscribe(
        data => {
          this.securityClearenceData = data.data;
       
        }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-login-recruiter',
  templateUrl: './login-recruiter.component.html',
  styleUrls: ['./login-recruiter.component.css']
})
export class LoginRecruiterComponent implements OnInit {
password="";email=""; inputLogin;
valid;input;response;
recruiterviewProfileData;
wsUrl;
inputData;min;max;getData;addNumber;number;number2;errorMessage;inputUrl;status;succesLoginFlag=false;errorMsgFlag=false;
  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  this.generate();
  }

    onLogin(f:NgForm){
       if(parseInt(this.addNumber) === (this.number + this.number2)){
           this.errorMessage="";
      this.inputLogin={
        "email":this.email,
        "password":this.password
      }
            console.log( this.inputLogin,"login-recru")
  this.inputUrl= "http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/signin";
       this._commonRequestService.postData(this.inputUrl, this.inputLogin).subscribe(
        data => {
          this.getData = data;
           if( this.getData.status === "TRUE" && this.getData.data.type === "recuriter"){
             this.errorMsgFlag =false;
              this.succesLoginFlag =true;
              this.getViewProfileDta();
             
          }
          else{
             this.errorMsgFlag =true;
              this.succesLoginFlag =false;
          }
          this.inputLogin={};
          console.log("login_status: ", this.status);
        }
    )
      }else{
         this.errorMessage ="please enter valid number!"
       }
}

getRandamValue(max,min){
    return  Math.floor(Math.random() * 4) + 2; 
}
getRandamValue1(max,min){
    return  Math.floor(Math.random() * 6) + 1  
}
    generate = function() {
        this.number = this.getRandamValue(1, 10);
        this.number2 = this.getRandamValue1(1, 10);
    }


  getViewProfileDta() {
          this.input={
        "email":this.email,
        // "password":this.password,
        "loginToken": this.getData.data.loginToken
      }
   this.wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/view";
       this._commonRequestService.postData(this.wsUrl,this.input).subscribe(
        data => {
          this.response = data;
           this.recruiterviewProfileData = data.data;
           if( this.response.status === "TRUE"){
              this.router.navigate(['recruiters/profile']);
               this._commonRequestService.setDataWithoutObserval( this.recruiterviewProfileData,'recruiter-profile-view-data');
             console.log("view_profile: ", this.recruiterviewProfileData);
           }
         
        }
    );


  }
}

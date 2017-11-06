import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-sign-up',
  templateUrl: './recruiter-sign-up.component.html',
  styleUrls: ['./recruiter-sign-up.component.css']
})
export class RecruiterSignUpComponent implements OnInit {
  requiredMsg = "";
  companyName = "";
  contactName="";
  valid;listSignUpData;ErrorMesageFlag=false;
  companyNameFlag = false;
  contactNameFlag = false;
  jobTitleFlag = false;
  phoneNoFlag = false;
  emailFlag = false;
  passwordFlag = false;
  keySkillFlag = false;
  inputData; JobTitle; phoneNo; emailAddress; passwordValue; keySkill; termOfUse = false; inputUrl; status; succesMessageFlag = false;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  companyNameBlur() {
    if(this.companyName) {
      this.companyNameFlag = false;
    } else {
      this.companyNameFlag = true;
    }
  }

  contactNameBlur() {
    if(this.contactName) {
      this.contactNameFlag = false;
    } else {
      this.contactNameFlag = true;
    }
  }

  jobTitleBlur() {
    if(this.JobTitle) {
      this.jobTitleFlag = false;
    } else {
      this.jobTitleFlag = true;
    }
  }

  phoneNoBlur() {
    if(this.phoneNo) {
      this.phoneNoFlag = false;
    } else {
      this.phoneNoFlag = true;
    }
  }

  emailBlur() {
    if(this.emailAddress) {
      this.emailFlag = false;
    } else {
      this.emailFlag = true;
    }
  }

  passwordBlur() {
    if(this.passwordValue) {
      this.passwordFlag = false;
    } else {
      this.passwordFlag = true;
    }
  }

  keySillBlur() {
    if(this.keySkill) {
      this.keySkillFlag = false;
    } else {
      this.keySkillFlag = true;
    }
  }

   onSignUp(userForm:NgForm){
      this.inputData={
              "recuriter_company_name":this.companyName,
              "recuriter_contact_name":this.contactName,
              "recuriter_business_email":this.emailAddress,
              "recuriter_contact_job_title":this.JobTitle,
              "recuriter_phone_number":this.phoneNo,
              "recuriter_new_password":this.passwordValue,
              "keySkill":["1","2"],
              "recuriter_tems_status":this.termOfUse
      }
      console.log( this.inputData,"fdf");
   this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/signup";
       this._commonRequestService.postData(this.inputUrl, this.inputData).subscribe(
        data => {
          this.listSignUpData = data;
          if(this.listSignUpData.status === "TRUE"){
            this.succesMessageFlag =true;
            this.ErrorMesageFlag =false
            this.companyName = "";
            this.contactName = "",
            this.emailAddress = "";
            this.JobTitle = "";
            this.phoneNo = "";
            this.passwordValue = "";
            this.termOfUse = false;
          }
          else{
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
          }
          console.log("rercu_sign: ", this.status);
        }
    );     

}

}

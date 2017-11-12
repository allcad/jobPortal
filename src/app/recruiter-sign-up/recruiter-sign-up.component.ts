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
  verifyPasswordValue;
  verifyPasswordValueFlag = false;
  allErrorMsgFlag = false;
  validPhoneNoFlag = false;
  phoneNoMaxLengthFlag = false;
  validEmailFlag = false;
  verifyEmailFlag = false;
  verifyEmailReqFlag = false;
  verifyEmailAddress;
  passwordSameFlag = false;
  emailSameFlag = false;
  inputData; JobTitle; phoneNo; emailAddress; passwordValue; keySkill; termOfUse = false; inputUrl; status; succesMessageFlag = false;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  

   onSignUp(userForm:NgForm){
     var phoneRegex = /^\d{10}$/;
     var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

     if(this.phoneNo && phoneRegex.test(this.phoneNo)) {
        this.validPhoneNoFlag = false;
      } else {
        this.validPhoneNoFlag = true;
      }

      if(this.emailAddress && emailRegex.test(this.emailAddress)) {
        this.validEmailFlag = false;
      } else {
        this.validEmailFlag = true;
      }

      if(this.verifyEmailAddress && emailRegex.test(this.verifyEmailAddress)) {
        this.verifyEmailFlag = false;
      } else {
        this.verifyEmailFlag = true;
      }

      if(this.emailAddress !== this.verifyEmailAddress) {
        this.emailSameFlag = true;
      } else {
        this.emailSameFlag = false;
      }

      if(this.phoneNo && this.phoneNo.length > 15) {
        this.phoneNoMaxLengthFlag = true;
      } else {
        this.phoneNoMaxLengthFlag = false;
      }

    if(this.companyName) {
      this.companyNameFlag = false;
    } else {
      this.companyNameFlag = true;
    }

    if(this.contactName) {
      this.contactNameFlag = false;
    } else {
      this.contactNameFlag = true;
    }

    if(this.JobTitle) {
      this.jobTitleFlag = false;
    } else {
      this.jobTitleFlag = true;
    }

    if(this.phoneNo) {
      this.phoneNoFlag = false;
    } else {
      this.phoneNoFlag = true;
    }

    if(this.emailAddress) {
      this.emailFlag = false;
    } else {
      this.emailFlag = true;
    }

    if(this.verifyEmailAddress) {
      this.verifyEmailReqFlag = false;
    } else {
      this.verifyEmailReqFlag = true;
    }

    if(this.passwordValue) {
      this.passwordFlag = false;
    } else {
      this.passwordFlag = true;
    }

    if(this.keySkill) {
      this.keySkillFlag = false;
    } else {
      this.keySkillFlag = true;
    }

    if(this.verifyPasswordValue) {
      this.verifyPasswordValueFlag = false;
    } else {
      this.verifyPasswordValueFlag = true;
    }

    if(this.passwordValue !== this.verifyPasswordValue) {
      this.passwordSameFlag = true;
    } else {
      this.passwordSameFlag = false;
    }

    if(this.companyNameFlag || this.contactNameFlag || this.phoneNoFlag || this.jobTitleFlag 
      || this.emailFlag || this.passwordFlag || this.verifyPasswordValueFlag || this.keySkillFlag || this.validPhoneNoFlag
      || this.phoneNoMaxLengthFlag || this.verifyEmailReqFlag || this.verifyEmailFlag || this.verifyEmailFlag
      || this.passwordSameFlag || this.emailSameFlag) {
      this.allErrorMsgFlag = true;
    } else {
      this.allErrorMsgFlag = false;
    }

      if(!this.allErrorMsgFlag) {
        this.inputData={
          "recuriter_company_name":this.companyName,
          "recuriter_contact_name":this.contactName,
          "recuriter_business_email":this.emailAddress,
          "recuriter_contact_job_title":this.JobTitle,
          "recuriter_phone_number":this.phoneNo,
          "recuriter_new_password":this.passwordValue,
          "keySkill":this.keySkill,
          "recuriter_tems_status":this.termOfUse
        }
        console.log( this.inputData,"fdf");
     this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/signup";
         this._commonRequestService.postData(this.inputUrl, this.inputData).subscribe(
          data => {
            window.scroll(0,0);
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
              this.verifyEmailAddress = "";
              this.keySkill = "";
              this.verifyPasswordValue = "";
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

}

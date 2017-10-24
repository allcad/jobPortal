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
  inputData; JobTitle; phoneNo; emailAddress; passwordValue; keySkill; termOfUse; inputUrl; status; succesMessageFlag = false;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
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
      console.log( this.inputData,"fdf")
   this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/signup";
       this._commonRequestService.postData(this.inputUrl, this.inputData).subscribe(
        data => {
          this.listSignUpData = data;
    if(this.listSignUpData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          this.inputData={};
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

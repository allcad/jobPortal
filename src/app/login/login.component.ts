import { Component, OnInit,NgModule } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
password="";email=""; inputLogin;
valid;dataUrl;response;
contractorviewProfileData;wsUrl;input;
inputData;min;max;addNumber;number;number2;errorMessage;inputUrl;status;succesLoginFlag=false;errorMsgFlag=false;
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
      var email = this.email;
            console.log( this.inputLogin,"login-conta")
  this.inputUrl= "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/signin" ;
       this._commonRequestService.postData(this.inputUrl, this.inputLogin).subscribe(
        data => {
          console.log(data);
           if( data.status === "TRUE"){
          
               this.succesLoginFlag =true;
                  this.errorMsgFlag =false;
                  localStorage.setItem("loginDetail", JSON.stringify({"token": data.data.loginToken, "email": email}))
                  this.router.navigate(['../contractor/viewProfile']);
           }
          else{
             this.errorMsgFlag =true;
              this.succesLoginFlag =false;
          }
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


  // getViewProfileDta() {
  //         this.input={
  //       "email":this.email,
  //       "password":this.password,
  //       "loginToken":data.data.loginToken,
  //     }
  //  this.wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/view";
  //      this._commonRequestService.postData(this.wsUrl,this.input).subscribe(
  //       data => {
  //         this.response = data;
  //          this.contractorviewProfileData = data.data;
  //          if( this.response.status === "TRUE"){
  //              this.router.navigate(['contractors/view-profile']);
  //              this._commonRequestService.setDataWithoutObserval( this.contractorviewProfileData,'contractor-profile-view-data');
  //            // console.log("view_profile: ", this.contractorviewProfileData);
  //          }
         
  //       }
  //   );


 // }
}

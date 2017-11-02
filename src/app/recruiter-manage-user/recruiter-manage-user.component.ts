import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-manage-user',
  templateUrl: './recruiter-manage-user.component.html',
  styleUrls: ['./recruiter-manage-user.component.css']
})
export class RecruiterManageUserComponent implements OnInit {
	//addMulUserArray = [{'userName':'', 'jobTitle': '', 'password':'', 'confirmPassword':'', 'email':'', 'telephone':''}];
  newUserName: string;
  jobTitleValue;
  userPassword;
  confirmPassWord;
  emailAddress;
  telephoneV;
  constructor() {
  	//this.addMulUserArray.splice(0,1);
   }

  ngOnInit() {
  }

  addAnotherUser() {
    var saveJson = {
      'newUser': this.newUserName,
      'jobTitle': this.jobTitleValue,
      'password': this.userPassword,
      'confirmPassword': this.confirmPassWord,
      'emailAddress': this.emailAddress,
      'telephone': this.telephoneV
    }
  	//this.addMulUserArray.push({'userName':'', 'jobTitle': '', 'password':'', 'confirmPassword':'', 'email':'', 'telephone':''})
  }

}

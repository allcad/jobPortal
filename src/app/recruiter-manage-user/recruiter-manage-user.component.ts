import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-manage-user',
  templateUrl: './recruiter-manage-user.component.html',
  styleUrls: ['./recruiter-manage-user.component.css']
})
export class RecruiterManageUserComponent implements OnInit {
	addMulUserArray = [{'userName':'', 'jobTitle': '', 'password':'', 'confirmPassword':'', 'email':'', 'telephone':''}];

  constructor() {
  	this.addMulUserArray.splice(0,1);
   }

  ngOnInit() {
  }

  addAnotherUser() {
  	this.addMulUserArray.push({'userName':'', 'jobTitle': '', 'password':'', 'confirmPassword':'', 'email':'', 'telephone':''})
  }

}

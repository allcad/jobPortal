import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-recruiter-manage-password',
  templateUrl: './recruiter-manage-password.component.html',
  styleUrls: ['./recruiter-manage-password.component.css']
})
export class RecruiterManagePasswordComponent implements OnInit {
  oldPassword;
  newPassword;
  confirmPassword;
  constructor() { }

  ngOnInit() {
  }

  saveRecruiterPassword(form: NgForm) {
  	var recruiterPasswordJson = {
		'oldPassword': this.oldPassword,
		'newPassword': this.newPassword,
		'confirmPassword': this.confirmPassword
	}
	console.log("recruiterPasswordJson--", recruiterPasswordJson);
  }

}

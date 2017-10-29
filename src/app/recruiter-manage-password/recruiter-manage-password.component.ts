import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-manage-password',
  templateUrl: './recruiter-manage-password.component.html',
  styleUrls: ['./recruiter-manage-password.component.css']
})
export class RecruiterManagePasswordComponent implements OnInit {
  oldPassword;
  newPassword;
  confirmPassword;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  savePassword(form: NgForm) {
  	var recruiterPasswordJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$DTSQAfFihO1F3OSQv.najuvalS6q57RU.NzsyPBVHi9tgpQmcl14y",
  		'oldPassword': this.oldPassword,
  		'newPassword': this.newPassword,
  		'confirmPassword': this.confirmPassword
  	}
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/password";
       this._commonRequestService.postData(wsUrl,recruiterPasswordJson).subscribe(
        data => {
         console.log("recruiter password--", data);
         this.oldPassword = "";
         this.newPassword = "";
         this.confirmPassword = "";
        }
    );
  }

}

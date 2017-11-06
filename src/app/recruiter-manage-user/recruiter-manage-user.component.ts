import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

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
  manageUserMsg;
  showMessage = false;
  subUserArray;
  constructor(public _commonRequestService: CommonRequestService) {
  	//this.addMulUserArray.splice(0,1);
   }

  ngOnInit() {
    this.makeSubUser();
  }

  addAnotherUser() {
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$qIXhfBp1FO4l8bfXilrWo.mgeDm2YiznM49TGdC00qeTP8.psEeFC",
      "recruiter_user_name":this.newUserName,
      "recuriter_business_email":this.emailAddress,
      "recuriter_contact_job_title":this.jobTitleValue,
      "recuriter_new_password":this.userPassword,
      "recuriter_new_c_password":this.confirmPassWord,
      "recuriter_phone_number":this.telephoneV
    }
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/add_user";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("manage user--", data);
         window.scroll(0,0);
         this.showMessage = true;
         this.newUserName = "";
         this.emailAddress = "";
         this.userPassword = "";
         this.jobTitleValue = "";
         this.confirmPassWord = "";
         this.telephoneV = "";
        }
    );
  }

  makeSubUser() {
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"
    }

    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/list/sub_user";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("manage sub user--", data);
         this.subUserArray = data.data;
         window.scroll(0,0);
        }
    );
  }

  makeSuperUser(id) {
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$qIXhfBp1FO4l8bfXilrWo.mgeDm2YiznM49TGdC00qeTP8.psEeFC",
      "recuriter_id":id
    }
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/make/super/user";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("manage super user--", data);
         window.scroll(0,0);
        }
    );
  }

  deleteUser(id) {
    var saveJson = {
      "email":"test@test7.com",
      "loginToken":"$2y$10$qIXhfBp1FO4l8bfXilrWo.mgeDm2YiznM49TGdC00qeTP8.psEeFC",
      "recuriter_id":id
    }
    var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/super/user/delete";
       this._commonRequestService.postData(wsUrl,saveJson).subscribe(
        data => {
         console.log("delete--", data);
         window.scroll(0,0);
        }
    );
  }

}

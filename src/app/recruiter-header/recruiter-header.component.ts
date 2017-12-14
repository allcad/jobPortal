import { Component, OnInit } from '@angular/core';
import { CommonService } from '../commonService.service';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-header',
  templateUrl: './recruiter-header.component.html',
  styleUrls: ['./recruiter-header.component.css']
})
export class RecruiterHeaderComponent implements OnInit {
	showMenu = false;
  constructor(private commonService: CommonService, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  postJobs() {
    this.commonService.setJobIdForJobPosting('');
  	var obj = {'jobId' : ''};
    localStorage.setItem('recruiterJobData', JSON.stringify(obj));

    var obj1 = {'jobPreviewData' : ''};
    localStorage.setItem('editJobPost', JSON.stringify(obj1));
  }

  logoutRecruiter(){
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/signout";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("securityClearanceArray--", data);
          if(data && data.status == 'TRUE') {
            //this.securityClearanceArray = data.data;
            localStorage.removeItem("loginDetail");
          }
          //this.recruiterNameArray = data.data;
        }
    );
  }

}

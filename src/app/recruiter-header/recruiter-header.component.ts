import { Component, OnInit } from '@angular/core';
import { CommonService } from '../commonService.service';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-header',
  templateUrl: './recruiter-header.component.html',
  styleUrls: ['./recruiter-header.component.css']
})
export class RecruiterHeaderComponent implements OnInit {
	showMenu = false;
  wsError;
  quickLinkData;

  constructor(private commonService: CommonService, public _commonRequestService: CommonRequestService, private router: Router) { }

  ngOnInit() {
    this.getQuickLinksData();
  }

  goToHome() {
    // this.commonService.setLoginSessionData(true);
    // this.router.navigate(['/public/home']);
  }

  postJobs() {
    this.commonService.setJobIdForJobPosting('');
  	var obj = {'jobId' : ''};
    localStorage.setItem('recruiterJobData', JSON.stringify(obj));

    var obj1 = {'jobPreviewData' : ''};
    localStorage.setItem('editJobPost', JSON.stringify(obj1));
  }

  logoutRecruiter(){
    this.commonService.setLoginSessionData(false);
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

  getQuickLinksData() {
    this.wsError = "";
   var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$WGsOK7LOBpmlMgYPI/3W6eHI0bZf.YW6mS2WxGNlTDcWXAnhNY3Be"
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/deashboard_quicklink";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("Quick data", data);
         if(data && data.status === "TRUE") {
           this.quickLinkData = data.data;
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
        }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
  styleUrls: ['./recruiter-home.component.css']
})
export class RecruiterHomeComponent implements OnInit {
	listingData = [];

  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {
  	this.getRecruiterCount();
  	this.getManageJobsList(9);
  }
  passJobId(id) {
  	//this._commonDataSharedService.manageJobsJobId.next(id);
  	var obj = {'jobId' : id};
    localStorage.setItem('recruiterJobData', JSON.stringify(obj));
  }

  getRecruiterCount() {
   var input = {
   	"email":"dummy@test.com",
	"loginToken":"$2y$10$dAixE9mJsFhouUU1NzgtvePYp7WjCcZ5NhzJPOLAO6Cz.wH0It0za",
	"login_type":JSON.parse(localStorage.getItem('loginDetail')).role

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/add_last_view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("add last view--", data);
         // if(data && data.status === "TRUE") {
         //   this.listingData = data.data;
         //  } else {
         //    if(data && data.error && data.error.length > 0) {
         //    // this.errorMsgFlag = true;
         //    //   this.errorMsg = data.error[0];
         //    }
         //  }
        }
    );
  }

  getManageJobsList(pageLimit) {
    console.log("pageLimit--", pageLimit);
   var input = {
   	"email":"test@test7.com",
	"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
   	"page":1,
	"limit":pageLimit
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/list";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("data from manage job list--", data);
         if(data && data.status === "TRUE") {
           this.listingData = data.data;
          } else {
            if(data && data.error && data.error.length > 0) {
            // this.errorMsgFlag = true;
            //   this.errorMsg = data.error[0];
            }
          }
        }
    );
  }

}

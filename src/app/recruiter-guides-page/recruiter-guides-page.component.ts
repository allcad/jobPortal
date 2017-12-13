import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-guides-page',
  templateUrl: './recruiter-guides-page.component.html',
  styleUrls: ['./recruiter-guides-page.component.css']
})
export class RecruiterGuidesPageComponent implements OnInit {
 emailValue;
 WSErrorMsg;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

   shareGuide() {
   	this.WSErrorMsg = "";
   	window.scroll(0,0);
     var input = {
     "send_to": this.emailValue
   };
   console.log("input--", input);
   if(this.emailValue) {
	   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/share_guide";
	       this._commonRequestService.postData(wsUrl,input).subscribe(
	        data => {
	          console.log("securityClearanceArray--", data);
	          if(data && data.status == 'TRUE') {
	          	this.WSErrorMsg = "";
	            this.emailValue = "";
	          } else {
	          	this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
	          }
	          //this.recruiterNameArray = data.data;
	        }
	    );
	}
  }

}

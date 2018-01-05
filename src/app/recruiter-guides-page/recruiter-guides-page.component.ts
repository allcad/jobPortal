import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recruiter-guides-page',
  templateUrl: './recruiter-guides-page.component.html',
  styleUrls: ['./recruiter-guides-page.component.css']
})
export class RecruiterGuidesPageComponent implements OnInit {
 emailValue;
 WSErrorMsg;
 videoUrl;
 type;
  constructor(public _commonRequestService: CommonRequestService, public route: Router) {

	 }

  ngOnInit() {
  	window.scroll(0,0);
		//this.shareGuide();
		this.showGuide();


		this.type = this.route.url == '/public/guides' ? 'Recruiter' : 'Contractor';
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
	
	showGuide() {
		this.WSErrorMsg = "";
		window.scroll(0,0);
		var input = {
			page:1,
			limit:3,
			guide_type: this.route.url == '/public/guides' ? 'Recruiter' : 'Contractor'
			
	};
	console.log("input--", input);
		var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/guide/guide_type";
				this._commonRequestService.postData(wsUrl,input).subscribe(
				 data => {
					 console.log("guide data--", data);
					 if(data && data.status == 'TRUE') {
						 this.videoUrl = data.data[0];
						 this.WSErrorMsg = "";
					 } else {
						 this.WSErrorMsg = typeof (data.error) == 'object' ? data.error[0] : data.error;
					 }
					 //this.recruiterNameArray = data.data;
				 }
		 );
 }

}

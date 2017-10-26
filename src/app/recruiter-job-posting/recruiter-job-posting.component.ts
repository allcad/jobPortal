import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router } from '@angular/router';
import { FormsModule,NgForm } from '@angular/forms';

@Component({
  selector: 'app-recruiter-job-posting',
  templateUrl: './recruiter-job-posting.component.html',
  styleUrls: ['./recruiter-job-posting.component.css']
})
export class RecruiterJobPostingComponent implements OnInit {

jobPostingJobTitle: string;
jobPostingDuration;
startDate;
industrySector = 0;
workEligibility = 0;
cityTownValue;
minRate: number;
maxRate: number;
dailyHourlyValue;
jobSpecificationTitle: any;
jobSpecificationBody: any;
recruiterName = 0;
saveTemplateAs;
jobReference;
input;

  constructor(private router: Router, public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  onJobPostSave(f:NgForm) {
  	this.input={
        //"email":this.email,
        // "password":this.password,
        //"loginToken": this.getData.data.loginToken,
			"email":"test@test7.com",
			"loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu",
			"jobTitle": this.jobPostingJobTitle,
			"duration": this.jobPostingDuration,
			"startDate": this.startDate,
			"industrySectorId": this.industrySector,
			"workEligibilityId" : this.workEligibility,
			"cityTown": this.cityTownValue,
			"prefereedRate": {
				"minRate": this.minRate,
				"maxRate": this.maxRate,
				"dailyHourlyRate": this.dailyHourlyValue
			},
			"jobSpecification": this.jobSpecificationBody,
			"jobSpecificationTitle": this.jobSpecificationTitle,
			"recruiterNameId": this.recruiterName,
			"saveTempleteAs": this.saveTemplateAs,
			"jobReference": this.jobReference

      }
      var wsUrl;
      alert(0);
      console.log("this.input", this.input);
    wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/add";
       this._commonRequestService.postData(wsUrl,this.input).subscribe(
        data => {
        	console.log("data result", data);
          // this.response = data;
          //  this.recruiterviewProfileData = data.data;
          //   if( this.response.status === "TRUE"){
          //    //if( this.response.status === "FALSE"){
          //     this.router.navigate(['recruiter/profile']);
          //  }
         
        }
    );
  }

}

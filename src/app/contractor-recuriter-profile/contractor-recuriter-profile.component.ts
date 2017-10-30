import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-recuriter-profile',
  templateUrl: './contractor-recuriter-profile.component.html',
  styleUrls: ['./contractor-recuriter-profile.component.css']
})
export class ContractorRecuriterProfileComponent implements OnInit {
	jobList=[];
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	this.getJobList();
  }

  getJobList(){
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/job/list";
  	var inputJson = {
  		"email" : "test@gmail.com",
  		"loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
  		"page":1,
  		"limit":3

  	}
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.jobList = data.data; 
          console.log("jobList", this.jobList);
        }
    );
  }

}

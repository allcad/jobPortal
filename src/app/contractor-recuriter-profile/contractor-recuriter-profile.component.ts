import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-recuriter-profile',
  templateUrl: './contractor-recuriter-profile.component.html',
  styleUrls: ['./contractor-recuriter-profile.component.css']
})
export class ContractorRecuriterProfileComponent implements OnInit {
	jobList=[];
  companyId;
  pageNo = 1;
  pageSize = 3;
  showAll = false;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.companyId = JSON.parse(localStorage.getItem("companyId"));
    if(this.companyId){
     // this.getCompanyProfile(this.companyId)
    }
  	this.getJobList();
  }

  // getCompanyProfile(companyId){
  //   var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/view";
  //   var inputJson = {
  //     "email" : "test@gmail.com",
  //     "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
  //     "jobid": companyId

  //   }
  //      this._commonRequestService.postData(url, inputJson).subscribe(
  //       data => {
  //         this.jobList = data.data; 
  //         console.log("jobList", this.jobList);
  //       }
  //   );
  // }

  getJobList(){
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/list";
  	var inputJson = {
  		"email" : "test@gmail.com",
  		"loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
  		"page":this.pageNo,
  		"limit":this.pageSize

  	}
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.jobList = data.data; 
          
        }
    );
  }

  getAllJobs(){
    if(this.showAll){
       this.pageNo = 1;
       this.pageSize =3;
    
  }else{
    this.pageNo = 1;
    this.pageSize =20;
  }
    
    this.getJobList();
    this.showAll = !this.showAll;
  }





  applyJob(jobDetail){
    console.log(jobDetail);
    var url =" http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/apply";
    var inputJson = {
      "email" : "test@gmail.com",
      "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "jobid": jobDetail.jobid

    }
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.getJobList();
        }
    );
  }

}

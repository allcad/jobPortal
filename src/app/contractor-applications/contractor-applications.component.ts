import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contractor-applications',
  templateUrl: './contractor-applications.component.html',
  styleUrls: ['./contractor-applications.component.css']
})
export class ContractorApplicationsComponent implements OnInit {
	appliedJobList = [];
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
  	this.getAppliedjobList();
  }

  getAppliedjobList(){
  	let input = {
  		"email" : "test@test.com",
  		"loginToken" : "lsbdjaGUJ46fdsfJnLMjdfsdfssdfJG67",
  		"page" : 1,
  		"limit" : -1
  	}
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/applied_job/list";
      this._commonRequestService.postData(url, input).subscribe(
        data => {
          this.appliedJobList = data.data;
          
        }
    );

  }


  viewCompany(job){
    this._commonRequestService.setDataWithoutObserval(job.company_id, "viewCompanyId");
    localStorage.setItem("viewCompanyId", job.company_id);
    this._router.navigate(['../companyProfile'], {relativeTo: this._routes});
  }

}

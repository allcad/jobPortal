import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
declare var $: any;
@Component({
	selector: 'app-contractor-job-detail',
	templateUrl: './contractor-job-detail.component.html',
	styleUrls: ['./contractor-job-detail.component.css']
})
export class ContractorJobDetailComponent implements OnInit {
	jobId;
	jobData;
	isPublic;
	cvList;
	coverList;
	selectedCv;
	selectedCover;
	pageNo = 1;
	jobList = [];
	totalPage;
	appliedJob;
	showSuccessMsg;
	successMsg;
	constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

	ngOnInit() {

		this._routes.params.subscribe((params: Params) => {
			if (this._router.url.split('/')[1] == "public") {
				this.isPublic = true;
			}
			this.jobId = params['id'];
			if (this.jobId) {
				this.jobDetail(this.jobId);
				window.scroll(0,0);
			}
		})



		this.getJobList();
	}


	ngAfterViewInit() {
		window.scroll(0, 0);
	}


	jobDetail(jobId) {
		if (jobId) {
			let input = {
				"jobid": jobId,
			};
			if (!this.isPublic) {
				input['email'] = "test@gmail.com";
				input['loginToken'] = "tdfdsfsGUkl7789ljdoa"
			}
			let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/view";

			this._commonRequestService.postData(url, input)
				.subscribe(data => {
					console.log("jobDetail", data);
					this.jobData = data.data;
				})
		}
	}

	returnToSearch() {
		window.history.back();
	}


	applyJob(job) {
		this.appliedJob = job;
		if (this.appliedJob.applied !== 1) {
			$('#myModal').modal();
			//this.jobDetail = jobDetail;
			this.getCVList()

		}
	}


	getCVList() {
		var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/cv_cl_list";
		var inputJson = {
			"email": "test@gmail.com",
			"loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"

		}
		this._commonRequestService.postData(url, inputJson).subscribe(
			data => {
				console.log("data", data);
				this.cvList = data.data.uploadCV;
				this.coverList = data.data.uploadCoverLetter;
			}
		);
	}

	apply() {
		this.showSuccessMsg = false;
		var url = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/apply";
		var inputJson = {
			"email": "test@gmail.com",
			"loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
			"jobid": this.jobId,
			"cv": this.selectedCv,
			"cl": this.selectedCover
		}
		this._commonRequestService.postData(url, inputJson).subscribe(
			data => {
				this.appliedJob.applied = 1;
				this.showSuccessMsg = true;
				this.successMsg = "Job applied";
			}
		);
	}


	getJobList() {
		var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/list";
		var inputJson = {
			"page": this.pageNo,
			"limit": 3

		}
		if (!this.isPublic) {
				inputJson['email'] = "test@gmail.com";
				inputJson['loginToken'] = "tdfdsfsGUkl7789ljdoa"
			}
		this._commonRequestService.postData(url, inputJson).subscribe(
			data => {
				if (data.status == 'TRUE') {
					this.jobList = this.jobList.concat(data.data);
					this.totalPage = data.TotalPage;
				}


			}
		);
	}

	viewCompanyProfile() {
		this._commonRequestService.setDataWithoutObserval(this.jobData.company_id, "viewCompanyId");
	    localStorage.setItem("viewCompanyId", this.jobData.company_id);
	    this._router.navigate(['/contractor/companyProfile'], { relativeTo: this._routes });
	}

}

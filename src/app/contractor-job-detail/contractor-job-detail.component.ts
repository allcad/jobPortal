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
	constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

	ngOnInit() {
		this._routes.params.subscribe((params: Params) => {
			this.jobId = params['id'];
			if (this.jobId) {
				this.jobDetail(this.jobId)
			}
		})

		if (this._router.url.split('/')[1] == "public") {
			this.isPublic = true;
		}
	}


	jobDetail(jobId) {
		if (jobId) {
			let input = {
				"jobid": jobId,
				"loginToken": "awawdeaSADSAI8Y9dDKQIasfsa",
				"email": "test@gmail.com"
			};
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


	applyJob() {
		if (this.jobData.applied !== 1) {
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
				this.jobData.applied = 1;
				console.log("applied")
			}
		);
	}

}

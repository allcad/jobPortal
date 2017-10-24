import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-manage-account',
  templateUrl: './recruiter-manage-account.component.html',
  styleUrls: ['./recruiter-manage-account.component.css']
})
export class RecruiterManageAccountComponent implements OnInit {
  name: string;
  jobTitle: string;
  telePhone: number;

  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }

  saveRecruiterAccount(form: NgForm) {
  	var recruiterAccountJson = {
		personalDetails: {
			'name': this.name,
			'jobTitle': this.jobTitle
		},
		contactDetails: {
			'telephone': this.telePhone
		}
	}
	console.log("recruiterAccountJson--", recruiterAccountJson);
  }

}

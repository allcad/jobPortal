import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-header',
  templateUrl: './recruiter-header.component.html',
  styleUrls: ['./recruiter-header.component.css']
})
export class RecruiterHeaderComponent implements OnInit {
	showMenu = false;
  constructor() { }

  ngOnInit() {
  }

  postJobs() {
  	var obj = {'jobId' : ''};
    localStorage.setItem('recruiterJobData', JSON.stringify(obj));

    var obj1 = {'jobPreviewData' : ''};
    localStorage.setItem('editJobPost', JSON.stringify(obj1));
  }

}

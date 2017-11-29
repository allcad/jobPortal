import { Component, OnInit } from '@angular/core';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonRequestService } from '../common-request.service';
import { CommonService } from '../commonService.service';

@Component({
  selector: 'app-recruiter-watch-list',
  templateUrl: './recruiter-watch-list.component.html',
  styleUrls: ['./recruiter-watch-list.component.css']
})
export class RecruiterWatchListComponent implements OnInit {

  constructor(private _commonDataShareService: CommonDataSharedService, public _commonRequestService: CommonRequestService,
    private _commonService: CommonService) { }

  ngOnInit() {
  }

}

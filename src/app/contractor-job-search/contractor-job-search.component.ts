import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-job-search',
  templateUrl: './contractor-job-search.component.html',
  styleUrls: ['./contractor-job-search.component.css']
})
export class ContractorJobSearchComponent implements OnInit {
jobTitle;
keywords;
excluding;
distance;
place;
minRate;
maxRate;
rateType="daily";
jobPreferenceNumber;
showContracts;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  }


  searchJob(){
  	var inputJson = {
  		jobTitle : this.jobTitle,
  		keywords : this.keywords,
  		excluding : this.excluding,
  		distanceInMile : this.distance,
  		place: this.place,
  		minRate: this.minRate,
  		maxRate: this.maxRate,
  		rateType: this.rateType,
  		jobPreferenceNumber : this.jobPreferenceNumber,
  		showContact: this.showContracts
  	}
  	console.log(inputJson);
    var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          console.log("searchData", data);
          
        }
    );
  }

  resetSearch(){
    this.jobTitle = "";
    this.keywords = "";
    this.excluding ="";
    this.distance = "";
    this.place = "";
    this.minRate = "";
    this.maxRate = "";
    this.rateType = "daily"
    this.jobPreferenceNumber = "";
    this.showContracts= "";

  }

}

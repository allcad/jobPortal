import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-search-result',
  templateUrl: './contractor-search-result.component.html',
  styleUrls: ['./contractor-search-result.component.css']
})
export class ContractorSearchResultComponent implements OnInit {

  constructor(private _commonRequestService: CommonRequestService) { }
  totalRecords;
  searchResult = [];
  ngOnInit() {
  	console.log(JSON.parse(localStorage.getItem("jobSearch")));
  	let searchJson = JSON.parse(localStorage.getItem("jobSearch"));
  	this.getSearchData(searchJson);
  }

  getSearchData(searchJson){
  	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/search";
  	this._commonRequestService.postData(url,searchJson)
  		.subscribe(data=>{
  			if(data.status == "TRUE"){
  				this.searchResult = data.data;
  				this.totalRecords = data.recordsTotal;
  			} else{
  				if(data.error == "No Record Found"){
  					this.totalRecords = 0;
  				}
  			}
  		})
  }


  applyJob(jobDetail){

    if(jobDetail.applyed !== 1){
      var url =" http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/apply";
    var inputJson = {
      "email" : "test@gmail.com",
      "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "jobid": jobDetail.jobid

    }
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          jobDetail.applyed = 1;
        }
    );
   
    
  }
  }
}

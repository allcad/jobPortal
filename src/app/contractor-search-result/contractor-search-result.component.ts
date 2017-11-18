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
  filteredData = []
  sortOptionsList = [];
  sort = 1;
  searchJson;
  ngOnInit() {
  	console.log(JSON.parse(localStorage.getItem("jobSearch")));
  	this.searchJson = JSON.parse(localStorage.getItem("jobSearch"));
  	this.getSearchData();
    this.getSortList();

  }

  getSortList(){
    let url = 'http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by_contractor_search';
    this._commonRequestService.getData(url)
      .subscribe(data=>{
        this.sortOptionsList = data.data;
      })


  }



  getSearchData(){
    this.searchJson.sort = this.sort;
  	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/search";
  	this._commonRequestService.postData(url,this.searchJson)
  		.subscribe(data=>{
  			if(data.status == "TRUE"){
  				this.searchResult = data.data;
          // this.filteredData = this.searchResult.filter(item=>{
          //   return item
          // });
  				this.totalRecords = data.recordsTotal;
  			} else{
  				if(data.error == "No Record Found"){
  					this.totalRecords = 0;
            this.searchResult = [];
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


  getRangeSliderValue(event){
    // this.filteredData = this.searchResult.filter(item=>{
    //   return  item.prefereedRate.minRate>event.from && item.prefereedRate.maxRate<event.to
    // })

    this.searchJson.contractor_search_by_rate_min = event.from;
    this.searchJson.contractor_search_by_rate_max = event.to;
    this.getSearchData();
  }
}

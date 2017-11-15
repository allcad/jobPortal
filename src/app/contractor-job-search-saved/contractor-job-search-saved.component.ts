import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-job-search-saved',
  templateUrl: './contractor-job-search-saved.component.html',
  styleUrls: ['./contractor-job-search-saved.component.css']
})
export class ContractorJobSearchSavedComponent implements OnInit {
industrySectorData = [];
savedSearchList = [];
rateType="daily";
searchName: string;
distance="0";
excludingWords;
jobRefNumber;
jobTitle;
keywords;
maxRate;
minRate;
location;
postDuration;
industrySector = [];
seletecSearchId;
showList = false;
saveClicked=false;
showSuccessMsg = false;
showErrorMsg = false;
errorMsg = "";
successMsg = "";
searchNameExist = false;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	this.getIndustrySector();
  	this.getListOfSavedSearch()
  }

  getIndustrySector(){
    let dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
       this._commonRequestService.getData(dataUrl).subscribe(
        data => {
          this.industrySectorData = data.data;
       
        }
    );
  }


  getListOfSavedSearch(){
  	let input = {
  		"email": "johnsmith21@gmail.com",
		"loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
  	};
  	let url="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/list";
       this._commonRequestService.postData(url, input).subscribe(
        data => {
          	this.savedSearchList = data.data;
       		console.log("savedSearchList", this.savedSearchList);
        }
    );
  }

  saveSearch(form){

    if(form.valid && this.isSearchAlreadyExist(this.searchName)){
      let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search";
      let inputJson =  {
      "email": "johnsmith21@gmail.com",
      "loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
      "contractor_search_name": this.searchName ? this.searchName : null,
      "contractor_search_by_miles": this.distance ? this.distance : null,
      "contractor_search_by_exclude_words": this.excludingWords ? this.excludingWords : null,
      "contractor_search_by_job_reference_number": this.jobRefNumber ? this.jobRefNumber : null,
      "contractor_search_by_job_title": this.jobTitle ? this.jobTitle : null,
      "contractor_search_by_keywords": this.keywords ? this.keywords : null,
      "contractor_search_by_rate_max": this.maxRate  ? this.maxRate : null,
      "contractor_search_by_rate_min": this.minRate ? this.minRate : null,
      "contractor_search_by_location": this.location ? this.location : null,
      "contractor_search_by_rate_type": this.rateType,
      "contractor_search_by_posted_contact_since": this.postDuration ? this.postDuration : null,
      "contractor_search_by_industry_sector" : this.industrySector
      }
      if(this.seletecSearchId){
        inputJson['contractor_search_id'] = this.seletecSearchId;
      }
      console.log("saveSearchInput", inputJson);
      
           this._commonRequestService.postData(url, inputJson).subscribe(
            data => {
              if(data.status == 'TRUE'){
                this.saveClicked=false
                this.resetForm();
                this.getListOfSavedSearch();  
                this.showSuccessMsg = true;
                this.successMsg = "Search Saved";
                window.scroll(0,0);
              }else{
                this.showErrorMsg = true;
                this.errorMsg = typeof(data.error)=='object' ? data.error[0] : data.error;
                window.scroll(0,0);
              }
              
           
            }
        );
    } else{
      window.scroll(0,0)
    }

  	
  }

  isSearchAlreadyExist(searchName){
    this.searchNameExist = false;
    if(searchName && !(this.seletecSearchId>0)){
      for(let i=0;i<this.savedSearchList.length;i++){
      if((this.savedSearchList[i].contractor_search_name).trim().toLowerCase() == searchName.trim().toLowerCase()){
        this.searchNameExist = true;
        return false;

      }
    }
    return true;;
    }
    else{
      return true;
    }
    
  }

  resetForm(){
  	this.rateType="daily";
	this.searchName="";
	this.distance="0";
	this.excludingWords="";
	this.jobRefNumber="";
	this.jobTitle="";
	this.keywords="";
	this.maxRate="";
	this.minRate="";
	this.location="";
	this.postDuration="";
	this.industrySector = [];
  this.seletecSearchId = 0;
  }

  searchSelect(id){
    this.seletecSearchId = id;
    let input = {
  		"email": "johnsmith21@gmail.com",
		"loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
		"contractor_search_id" : this.seletecSearchId
  	};
  	let url="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/detail";
       this._commonRequestService.postData(url, input).subscribe(
        data => {
          	let searchData = data.data;
       		console.log("searchDetail", data.data);
       		this.rateType=searchData.contractor_search_by_rate_type;
			this.searchName=searchData.contractor_search_name;
			this.distance=searchData.contractor_search_by_miles;
			this.excludingWords=searchData.contractor_search_by_exclude_words;
			this.jobRefNumber=searchData.contractor_search_by_job_reference_number;
			this.jobTitle=searchData.contractor_search_by_job_title;
			this.keywords=searchData.contractor_search_by_keywords;
			this.maxRate=searchData.contractor_search_by_rate_max;
			this.minRate=searchData.contractor_search_by_rate_min;
			this.location=searchData.contractor_search_by_location;
			this.postDuration=searchData.contractor_search_by_posted_contact_since;
			this.industrySector = searchData.contractor_search_by_industry_sector;
        }
    );
  }


  deleteSearch(){
  	if(this.seletecSearchId){
  		let input = {
  		"email": "johnsmith21@gmail.com",
		"loginToken": "$2y$10$U2wRqqX16ZU5/bno9773M.79k5Pag7h9njwxC7Bk6aqgB1NyElP0m",
		"contractor_search_id" : this.seletecSearchId
  	};
  	let url="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/save_search/delete";
       this._commonRequestService.postData(url, input).subscribe(
        data => {
          	 if(data.status == 'TRUE'){
                 this.seletecSearchId = "";
                 this.resetForm();
                this.getListOfSavedSearch();
                this.successMsg = "Search deleted";
                this.showSuccessMsg = true;
                window.scroll(0,0);
              }else{
                this.showErrorMsg = true;
                this.errorMsg = typeof(data.error)=='object' ? data.error[0] : data.error;
                window.scroll(0,0);
              }
        }
    );
  	}
  	
  }

  getSaveSearchList(){

  }

  runSearch(){
    
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contractor-job-search',
  templateUrl: './contractor-job-search.component.html',
  styleUrls: ['./contractor-job-search.component.css']
})
export class ContractorJobSearchComponent implements OnInit {
jobTitle;
keywords;
excluding;
distance="0";
place;
minRate;
maxRate;
rateType="";
jobPreferenceNumber;
showContracts="0";
industrySectorData = [];
industrySector = [];
lastSearchData;
submitClick = false;
timeSlotList =[];
isPublic = false;

  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0,0);
    this.getIndustrySector();
    this.gettimeSlotList();
    if(this._router.url.split('/')[2] == "lastSearch"){
      this.lastSearch();
    }
    if(this._router.url.split('/')[1] == "public"){
      this.isPublic = true;
    }
  }

  gettimeSlotList(){
    let dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/time_slot_contractor_search";
       this._commonRequestService.getData(dataUrl).subscribe(
        data => {
          this.timeSlotList = data.data;
       
        }
    );
  }

  getIndustrySector(){
    let dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
       this._commonRequestService.getData(dataUrl).subscribe(
        data => {
          this.industrySectorData = data.data;
       
        }
    );
  }


  searchJob(form){
    this.submitClick = true;
    if(form.valid){
      var inputJson = {
        contractor_search_by_job_title : this.jobTitle ? this.jobTitle: "",
        contractor_search_by_keywords : this.keywords ? this.keywords : "",
        contractor_search_by_exclude_words : this.excluding ? this.excluding : "",
        contractor_search_by_miles : this.distance && this.distance !='0' ? this.distance: "",
        contractor_search_by_location: this.place ? this.place : "",
        contractor_search_by_rate_min: this.minRate ? this.minRate : "",
        contractor_search_by_rate_max: this.maxRate ? this.maxRate : "",
        contractor_search_by_rate_type: this.rateType ? this.rateType : "",
        contractor_search_by_job_reference_number : this.jobPreferenceNumber ? this.jobPreferenceNumber : "",
        contractor_search_by_posted_contact_since: this.showContracts && this.showContracts!=='0' ? this.showContracts : "",
        contractor_search_by_industry_sector : this.industrySector ? this.industrySector : "",
        page : 1,
        limit: 10,
        sort: 1
    } 

    if(!this.isPublic){
      inputJson['email'] = "david@gmail.com";
      inputJson['loginToken'] = "zbdkjasdJJJ41saloijdoailkL"
    }

    localStorage.setItem("jobSearch", JSON.stringify(inputJson));
    this._router.navigate(['../searchResult'],{'relativeTo': this._routes});

    } else{
      window.scroll(0,0);
    }
  	
  	// console.log(inputJson);
   //  var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/search";
   //    this._commonRequestService.postData(url, inputJson).subscribe(
   //      data => {
   //        console.log("searchData", data);
          
   //      }
   //  );
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

  lastSearchClick(){
    this._router.navigate(['../lastSearch'], {relativeTo: this._routes});
  }

  lastSearch(){
    let dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/last_search";
    let obj = {
      "email":"david@gmail.com",
      "loginToken": "sdnkasdlajdla"
    }
       this._commonRequestService.postData(dataUrl, obj).subscribe(
        data => {
          this.lastSearchData= data.data;
          this.jobTitle = this.lastSearchData.contractor_search_by_job_title;
          this.keywords = this.lastSearchData.contractor_search_by_keywords;
          this.excluding =this.lastSearchData.contractor_search_by_exclude_words;
          this.distance = this.lastSearchData.contractor_search_by_miles;
          this.place = this.lastSearchData.contractor_search_by_location;
          this.minRate = this.lastSearchData.contractor_search_by_rate_min;
          this.maxRate = this.lastSearchData.contractor_search_by_rate_max;
          this.rateType = this.lastSearchData.contractor_search_by_rate_type;
          this.jobPreferenceNumber = this.lastSearchData.contractor_search_by_job_reference_number;
          this.showContracts= this.lastSearchData.contractor_search_by_posted_contact_since;
          this.industrySector = this.lastSearchData.contractor_search_by_industry_sector;
        }
    );
  }

}

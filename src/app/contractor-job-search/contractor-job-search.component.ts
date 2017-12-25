import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-contractor-job-search',
  templateUrl: './contractor-job-search.component.html',
  styleUrls: ['./contractor-job-search.component.css']
})
export class ContractorJobSearchComponent implements OnInit {
  jobTitle;
  keywords;
  excluding;
  distance = "0";
  minRate;
  maxRate;
  rateType = "daily";
  jobPreferenceNumber;
  showContracts = "0";
  industrySectorData = [];
  industrySector = [];
  lastSearchData;
  submitClick = false;
  timeSlotList = [];
  isPublic = false;
  @ViewChild("searchBox") serachBox;
  postcode;
  displayTown;
  displayCountry;
  displayLocationName;
  formNotValid = false;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute, private ngZone: NgZone) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.getIndustrySector();
    this.gettimeSlotList();
    if (this._router.url.split('/')[2] == "lastSearch") {
      this.setSearchData(JSON.parse(localStorage.getItem('jobSearch')))
    }
    if (this._router.url.split('/')[1] == "public") {
      this.isPublic = true;
    }
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
  }

  gettimeSlotList() {
    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/time_slot_contractor_search";
    this._commonRequestService.getData(dataUrl).subscribe(
      data => {
        this.timeSlotList = data.data;

      }
    );
  }

  getIndustrySector() {
    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/industries";
    this._commonRequestService.getData(dataUrl).subscribe(
      data => {
        this.industrySectorData = data.data;

      }
    );
  }


  searchJob(form) {
    this.submitClick = true;
    this.formNotValid = false;
    if (this.checkForMinAndMaxValueValidation()) {
      var inputJson = {
        contractor_search_by_job_title: this.jobTitle ? this.jobTitle : "",
        contractor_search_by_keywords: this.keywords ? this.keywords : "",
        contractor_search_by_exclude_words: this.excluding ? this.excluding : "",
        contractor_search_by_miles: this.distance && this.distance != '0' ? this.distance : "",
        contractor_search_by_location: this.displayLocationName,
        contractor_search_by_rate_min: this.minRate ? this.minRate : "",
        contractor_search_by_rate_max: this.maxRate ? this.maxRate : "",
        contractor_search_by_rate_type: this.rateType ? this.rateType : "",
        contractor_search_by_job_reference_number: this.jobPreferenceNumber ? this.jobPreferenceNumber : "",
        contractor_search_by_posted_contact_since: this.showContracts && this.showContracts !== '0' ? this.showContracts : "",
        contractor_search_by_industry_sector: this.industrySector ? this.industrySector : "",
        postcode: this.postcode,
        display_town: this.displayTown,
        display_county: this.displayCountry,
        display_name: this.displayLocationName,
        page: 1,
        limit: 10,
        sort: 1
      }

      if (!this.isPublic) {
        inputJson['email'] = "david@gmail.com";
        inputJson['loginToken'] = "zbdkjasdJJJ41saloijdoailkL"
      }

      localStorage.setItem("jobSearch", JSON.stringify(inputJson));
      //this._router.navigate(['../searchResult'], { 'relativeTo': this._routes });
      this._router.navigate(['../contractor_search'], { 'relativeTo': this._routes, queryParams :  inputJson} )

    } else {
      this.formNotValid = true;
      window.scroll(0, 0);
    }
  }

  checkForMinAndMaxValueValidation() {
    if (this.minRate && this.maxRate) {
      if (this.minRate > this.maxRate) {
        return false;
      }
    }
    return true;
  }

  resetSearch() {
    this.jobTitle = "";
    this.keywords = "";
    this.excluding = "";
    this.distance = "";
    this.minRate = "";
    this.maxRate = "";
    this.rateType = "daily"
    this.jobPreferenceNumber = "";
    this.showContracts = "0";
    this.serachBox.updateText("");
  }

  lastSearchClick() {
    this.lastSearch();
  }

  lastSearch() {
    let dataUrl = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/last_search";
    let obj = {
      "email": "david@gmail.com",
      "loginToken": "sdnkasdlajdla"
    }
    this._commonRequestService.postData(dataUrl, obj).subscribe(
      data => {
        this.lastSearchData = data.data;
        this.setSearchData(this.lastSearchData);
      }
    );
  }

  setSearchData(dataObject) {
    this.jobTitle = dataObject.contractor_search_by_job_title;
    this.keywords = dataObject.contractor_search_by_keywords;
    this.excluding = dataObject.contractor_search_by_exclude_words;
    this.distance = dataObject.contractor_search_by_miles;
    this.minRate = dataObject.contractor_search_by_rate_min;
    this.maxRate = dataObject.contractor_search_by_rate_max;
    this.rateType = dataObject.contractor_search_by_rate_type;
    this.jobPreferenceNumber = dataObject.contractor_search_by_job_reference_number;
    this.showContracts = dataObject.contractor_search_by_posted_contact_since || '0';
    this.industrySector = dataObject.contractor_search_by_industry_sector;
    this.postcode = dataObject.postcode;
    this.displayTown = dataObject.display_town;
    this.displayCountry = dataObject.display_county;
    this.displayLocationName = dataObject.display_name;
    this.serachBox.updateText(dataObject.display_name);
  }

 
  locationSelecetd(location) {
    this.postcode = location.postcode;
    this.displayTown = location.town_name;
    this.displayCountry = location.country;
    this.displayLocationName = location.town_name + ',' + location.country;
  }

  changeText(text) {
    if (typeof text == "string") {
      this.postcode = "";
      this.displayTown = "";
      this.displayCountry = "";
      this.displayLocationName = text;
    }

  }

  searchBoxBlank(){
    
  }
  
}

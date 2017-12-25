import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title;
  postcode;
  displayTown;
  displayCountry;
  displayLocationName;
  location;
  searchResult;
  selecetd;
  constructor(private _router: Router, private _routes: ActivatedRoute, private _commonRequestService: CommonRequestService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //this.loadLocationAutoData();
  }

  searchContract(title, minRate = "", maxRate = "") {
    let inputJson = {
      contractor_search_by_job_title: title,
      contractor_search_by_keywords: "",
      contractor_search_by_exclude_words: "",
      contractor_search_by_miles: "",
      contractor_search_by_location: this.displayLocationName,
      contractor_search_by_rate_min: minRate,
      contractor_search_by_rate_max: maxRate,
      contractor_search_by_rate_type: "",
      contractor_search_by_job_reference_number: "",
      contractor_search_by_posted_contact_since: "",
      contractor_search_by_industry_sector: "",
      postcode: this.postcode,
      display_town: this.displayTown,
      display_county: this.displayCountry,
      display_name: this.displayLocationName,
      page: 1,
      limit: 10,
      sort: 1
    }

    localStorage.setItem("jobSearch", JSON.stringify(inputJson));
    //this._router.navigate(['../searchResult'], { 'relativeTo': this._routes })
    this._router.navigate(['../contractor_search'], { 'relativeTo': this._routes, queryParams: inputJson })
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
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
  }

  searchContract(title, location, minRate="", maxRate="") {
    let inputJson = {
      contractor_search_by_job_title: title,
      contractor_search_by_keywords: "",
      contractor_search_by_exclude_words: "",
      contractor_search_by_miles: "",
      contractor_search_by_location: "",
      contractor_search_by_rate_min: minRate,
      contractor_search_by_rate_max: maxRate,
      contractor_search_by_rate_type: "",
      contractor_search_by_job_reference_number: "",
      contractor_search_by_posted_contact_since: "",
      contractor_search_by_industry_sector: "",
      page: 1,
      limit: 10,
      sort: 1
    }

    localStorage.setItem("jobSearch", JSON.stringify(inputJson));
    this._router.navigate(['../searchResult'], { 'relativeTo': this._routes })
    
    
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-searchresult-loggedin',
  templateUrl: './recruiter-searchresult-loggedin.component.html',
  styleUrls: ['./recruiter-searchresult-loggedin.component.css']
})
export class RecruiterSearchresultLoggedinComponent implements OnInit {
  searchList = [1,2];
  list = [1,2,3];
  constructor() { }

  ngOnInit() {
  	this.getSearchResultList();
  }

  getSearchResultList() {

  }

}

import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-latest-news-listing',
  templateUrl: './latest-news-listing.component.html',
  styleUrls: ['./latest-news-listing.component.css']
})
export class LatestNewsListingComponent implements OnInit {

  constructor(private _commonRequestService: CommonRequestService) { }
  newsList;
  ngOnInit() {
  	this.getLatestNews()
  }

  getLatestNews(){
  	
    var inputJson = {
      page :1,
      limit: 3
    }
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.newsList = data.data;
          console.log("newsList", this.newsList);
        }
    );
  }
}

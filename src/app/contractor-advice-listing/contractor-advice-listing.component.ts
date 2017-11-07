import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-advice-listing',
  templateUrl: './contractor-advice-listing.component.html',
  styleUrls: ['./contractor-advice-listing.component.css']
})
export class ContractorAdviceListingComponent implements OnInit {
	latestArticleList = [];
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {

  	this.getLatestArticle();
  }

  getLatestArticle(){
  	let input = {
  		page: 1,
  		limit : 3
  	}
	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/all";
      this._commonRequestService.postData(url, input).subscribe(
        data => {
          this.latestArticleList = data.data;
          console.log(this.latestArticleList);
        }
    );  	
  }

}

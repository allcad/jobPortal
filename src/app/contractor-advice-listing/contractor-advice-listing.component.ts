import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contractor-advice-listing',
  templateUrl: './contractor-advice-listing.component.html',
  styleUrls: ['./contractor-advice-listing.component.css']
})
export class ContractorAdviceListingComponent implements OnInit {
	latestArticleList = [];
  loading = true;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {

  	this.getLatestArticle();
  }


  ngAfterViewInit(){
   window.scroll(0,0);
  }

  getLatestArticle(){
    this.loading = true;
  	let input = {
  		page: 1,
  		limit : 2
  	}
	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/all";
      this._commonRequestService.postData(url, input).subscribe(
        data => {
          this.latestArticleList = data.data;
          console.log(this.latestArticleList);
          this.loading = false;
        }
    );  	
  }


}

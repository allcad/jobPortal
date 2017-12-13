import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataSharedService } from '../commonDataSharedService';
@Component({
  selector: 'app-contractor-advice-listing',
  templateUrl: './contractor-advice-listing.component.html',
  styleUrls: ['./contractor-advice-listing.component.css']
})
export class ContractorAdviceListingComponent implements OnInit {
	latestArticleList = [];
  loading = true;
  subscribeIns
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute, private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {

  	this.getLatestArticle();

    this.subscribeIns = this._commonDataSharedService.contractorHubSearch.subscribe(data => {
      this.searchArticle(data);
    })
  }


  ngAfterViewInit(){
   window.scroll(0,0);
  }

  searchArticle(searchKeyword) {
    if (searchKeyword) {
      var inputJson = {
        page: 1,
        limit: -1,
        search: searchKeyword
      }
      this.loading = true;
      var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/search";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.loading = false;
          if(data.status == 'TRUE'){
            if(data.recordsTotal >= 2){
              this.latestArticleList = [];
              this.latestArticleList.push(data.data[0]);
              this.latestArticleList.push(data.data[1]);
            }
            else if(data.recordsTotal < 2){
              this.latestArticleList = [];
              this.latestArticleList.push(data.data[0])
            }
          }
        }
      );

    }else{
      this.getLatestArticle();
    }
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

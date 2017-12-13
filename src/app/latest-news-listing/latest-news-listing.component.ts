import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-latest-news-listing',
  templateUrl: './latest-news-listing.component.html',
  styleUrls: ['./latest-news-listing.component.css']
})
export class LatestNewsListingComponent implements OnInit, OnDestroy {

  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute, private _commonDataSharedService: CommonDataSharedService) { }
  newsList;
  loading = true;
  subscribeIns;
  ngOnInit() {
    this.getLatestNews();
    this.subscribeIns = this._commonDataSharedService.contractorHubSearch.subscribe(data => {
      this.searchArticle(data);
    })
  }

  getLatestNews() {
    this.loading = true;
    var inputJson = {
      page: 1,
      limit: 2
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles";
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.newsList = data.data;
        console.log("newsList", this.newsList);
        this.loading = false;
      }
    );
  }

  searchArticle(searchKeyword) {
    if (searchKeyword) {
      var inputJson = {
        page: 1,
        limit: -1,
        search: searchKeyword
      }
      this.loading = true;
      var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles_search";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.loading = false;
          if(data.status == 'TRUE'){
            if(data.recordsTotal >= 2){
              this.newsList = [];
              this.newsList.push(data.data[0]);
              this.newsList.push(data.data[1]);
            }
            else if(data.recordsTotal < 2){
              this.newsList = [];
              this.newsList.push(data.data[0])
            }
          }
        }
      );

    }else{
      this.getLatestNews();
    }
  }


  goToNews(news) {
    this._commonRequestService.setDataWithoutObserval(news._id, "newsId");
    localStorage.setItem("newsId", news._id);
    this._router.navigate(['../news'], { relativeTo: this._routes });
  }

  ngOnDestroy() {
    this.subscribeIns.unsubscribe();
  }

}

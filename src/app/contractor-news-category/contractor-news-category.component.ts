import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-news-category',
  templateUrl: './contractor-news-category.component.html',
  styleUrls: ['./contractor-news-category.component.css']
})
export class ContractorNewsCategoryComponent implements OnInit {
	config : SwiperOptions = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        }
        newsList = [];
        featuredNewsList = [];
        popularNewsList = [];
        dataToShow = [];
  constructor(private _commonRequestService: CommonRequestService,private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.getLatestNews();
    this.getPopularNews();
    this.getFeaturedNews();
  }

  getLatestNews(){
    var inputJson = {
      page :1,
      limit: -1
    }
    var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.newsList = data.data;
          this.dataToShow = this.newsList;
          console.log("newsList", this.newsList);
        }
    );
  }


  getPopularNews(){
    var inputJson = {
      page :1,
      limit: -1
    }
    var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles_populer";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.popularNewsList = data.data;
          console.log("popularNewsList", this.popularNewsList);
        }
    );
  }

  getFeaturedNews(){
    var inputJson = {
      page :1,
      limit: -1
    }
    var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles_featured";
      this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.featuredNewsList = data.data;
          console.log("featuredNewsList", this.featuredNewsList);
        }
    );
  }

  readMore(news){
    this._commonRequestService.setDataWithoutObserval(news._id, "newsId");
    localStorage.setItem("newsId", news._id);
    this._router.navigate(['../news'], {relativeTo: this._routes});
  }

}

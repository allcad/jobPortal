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
  constructor(private _commonRequestService: CommonRequestService,private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.getLatestNews()
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
          console.log("newsList", this.newsList);
        }
    );
  }

  readMore(news){
    this._commonRequestService.setDataWithoutObserval(news._id, "newsId");
    localStorage.setItem("newsId", news._id);
    this._router.navigate(['../news'], {relativeTo: this._routes});
  }

}

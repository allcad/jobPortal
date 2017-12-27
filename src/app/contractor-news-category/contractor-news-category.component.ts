import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-news-category',
  templateUrl: './contractor-news-category.component.html',
  styleUrls: ['./contractor-news-category.component.css']
})
export class ContractorNewsCategoryComponent implements OnInit {
	config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    autoplay: 3000
  }
  newsList = [];
  featuredNewsList = [];
  popularNewsList = [];
  dataToShow;
  searchKeyword;
  loading = true;
  errorMsgFlag = false;
  email;
errorMsg;
subscriptionFlag = false;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.getLatestNews();
    this.getPopularNews();
    this.getFeaturedNews();
  }
  
  ngAfterViewInit(){
   window.scroll(0,0);
  }
 
  getLatestNews() {
    this.loading = true;
    var inputJson = {
      page: 1,
      limit: -1
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles";
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.loading = false;
        this.newsList = data.data;
        this.dataToShow = this.newsList;
        console.log("newsList", this.newsList);
      }
    );
  }


  getPopularNews() {
    this.loading = true;
    var inputJson = {
      page: 1,
      limit: -1
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles_populer";
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.popularNewsList = data.data;
        this.loading = false;
        console.log("popularNewsList", this.popularNewsList);
      }
    );
  }

  getFeaturedNews() {
    this.loading = true;
    var inputJson = {
      page: 1,
      limit: -1
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles_featured";
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.featuredNewsList = data.data;
        this.loading = false;
        console.log("featuredNewsList", this.featuredNewsList);
      }
    );
  }


  searchNews(searchKeyword) {
  if(searchKeyword){
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
          this.dataToShow = data.data;
        }else{
          this.dataToShow = [];
        }
        
      }
    );
  }
  

  }

  subscribeNewsLetter(){
    this.errorMsgFlag = false;
    if(this.email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
      this._commonRequestService.getData("https://api.ipify.org?format=json")
        .subscribe(data=>{
          this.callSubscription(data.ip, this.email);
        })
    }else{
      this.errorMsgFlag = true;
      this.errorMsg = "Please enter valid email";
      window.scroll(0,0);
      setTimeout(()=>{
        this.errorMsgFlag = false;
      },2000)
    }
  }


  callSubscription(ipAddress, email){
    var inputJson = {
      'email_subscriber': email,
      'ip': ipAddress
    }
    var url = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/newslatter";
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
         this.email = "";
         window.scroll(0,0);
         if(data.status == 'TRUE'){
           this.subscriptionFlag = true;
           setTimeout(()=>{this.subscriptionFlag = false;},3000)  
         }else{
           this.errorMsgFlag = true;
           this.errorMsg = data.error;
           setTimeout(()=>{this.errorMsgFlag = false;},3000)  
         }
         
      }
    );
  }

}

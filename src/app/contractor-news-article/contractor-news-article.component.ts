import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contractor-news-article',
  templateUrl: './contractor-news-article.component.html',
  styleUrls: ['./contractor-news-article.component.css']
})
export class ContractorNewsArticleComponent implements OnInit {
  articleId;
  articleData;
  loading = false;
  newsList = [];
  currentPage = 1;
  totalPage;
  email;
  subscriptionFlag = false;
  errorMsgFlag = false;
  errorMsg = "";
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {

    this._routes.params.subscribe((params: Params) => {
      this.articleId = params['id'];
      this.getArticle(this.articleId);  
    })

    
    this.getLatestNews();
    window.scroll(0, 0);

  }

  ngAfterViewInit() {
    window.scroll(0, 0);
  }

  getArticle(id) {
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles/single";
    let input = {
      id: id
    }
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        this.articleData = data.data;
        console.log("newsArticle", this.articleData);
        window.scroll(0,0);
      }
    );
  }


  getLatestNews() {
    this.loading = true;
    var inputJson = {
      page: this.currentPage,
      limit: 3
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles";
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.loading = false;
        this.totalPage = data.TotalPage;
        this.newsList = this.newsList.concat(data.data)  ;
        console.log("newsList", this.newsList);
      }
    );
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

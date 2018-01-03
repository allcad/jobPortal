import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-advice-category',
  templateUrl: './contractor-advice-category.component.html',
  styleUrls: ['./contractor-advice-category.component.css']
})
export class ContractorAdviceCategoryComponent implements OnInit {
  adviceCategoryData = [];
  articleList = [];
  latestAdviceArticleList = [];
  articleToShow = [];
  selectedAdviceCategory;
  config: SwiperOptions = {
    //pagination: '.swiper-pagination',
    //  paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    autoplay: 3000
  }
  searchClicked = false;
  searchKeyword;
  currentPage = 1;
  totalPage;
  email;
  subscriptionFlag;
  errorMsgFlag;
  errorMsg;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
    this.selectedAdviceCategory = this._commonRequestService.getDataWithoutObserval('advice_id');
    if (this.selectedAdviceCategory) {
      this.getPostByCategory();
    }
    this.getadviceCategory();
    this.getLatestAdviceArticle();
  }

  ngAfterViewInit() {
    window.scroll(0, 0);
  }

  getadviceCategory() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/category";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        console.log("adviceCategory", data.data)
        this.adviceCategoryData = data.data;
        if (!this.selectedAdviceCategory) {
          this.selectedAdviceCategory = this.adviceCategoryData[0].id;
          this.getPostByCategory();
        }
      }
    );
  }

  getPostByCategory() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "category": this.selectedAdviceCategory,
      "page": 1,
      "limit": -1

    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        console.log("articleList", data.data)
        this.articleList = data.data;
        if (this.searchClicked) {
          this.articleToShow = this.articleList;
        }
      }
    );
  }

  getLatestAdviceArticle() {
    let input = {
      page: this.currentPage,
      limit: 3
    }
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/all";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        this.latestAdviceArticleList = data.data;
        this.articleToShow = this.latestAdviceArticleList;
        this.totalPage = data.totalPage;
        console.log(this.latestAdviceArticleList);
      }
    );
  }

  readFullArticle(item) {
    console.log(item);
    localStorage.setItem("adviceArticleId", item.id);
    this._commonRequestService.setDataWithoutObserval(item.id, "adviceArticleId");
    this._router.navigate(['../adviceDetail'], { relativeTo: this._routes });
  }


  searchArticle() {
    if (this.searchKeyword) {
      let input = {
        page: 1,
        limit: -1,
        search: this.searchKeyword
      }
      var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/search";
      this._commonRequestService.postData(url, input).subscribe(
        data => {
          if (data.status == "TRUE") {
            this.articleToShow = data.data;
          } else if (data.status === "FALSE") {
            this.articleToShow = [];
          }

        }
      );
    }

  }


  subscribeNewsLetter() {
    this.errorMsgFlag = false;
    if (this.email && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
      this._commonRequestService.getData("https://api.ipify.org?format=json")
        .subscribe(data => {
          this.callSubscription(data.ip, this.email);
        })
    } else {
      this.errorMsgFlag = true;
      this.errorMsg = "Please enter valid email";
      window.scroll(0, 0);
      setTimeout(() => {
        this.errorMsgFlag = false;
      }, 2000)
    }
  }


  callSubscription(ipAddress, email) {
    var inputJson = {
      'email_subscriber': email,
      'ip': ipAddress
    }
    var url = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/newslatter";
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        this.email = "";
        window.scroll(0, 0);
        if (data.status == 'TRUE') {
          this.subscriptionFlag = true;
          setTimeout(() => { this.subscriptionFlag = false; }, 3000)
        } else {
          this.errorMsgFlag = true;
          this.errorMsg = data.error;
          setTimeout(() => { this.errorMsgFlag = false; }, 3000)
        }

      }
    );
  }



}

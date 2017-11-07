import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router,  ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contractor-news-article',
  templateUrl: './contractor-news-article.component.html',
  styleUrls: ['./contractor-news-article.component.css']
})
export class ContractorNewsArticleComponent implements OnInit {
	articleId;
	articleData;
  	constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
  	this.articleId = this._commonRequestService.getDataWithoutObserval("newsId");
  	if(!this.articleId){
  		this.articleId = localStorage.getItem("newsId");
  	}
	this.getArticle(this.articleId);

  }

  getArticle(id){
  	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/articles/single";
  	let input = {
  		id: id
  	}
      this._commonRequestService.postData(url, input).subscribe(
        data => {
          this.articleData = data.data;
          console.log("newsArticle", this.articleData);
        }
    );
  }

  returnToAll(){
  	
  	this._router.navigate(['../news_category'], {relativeTo: this._routes})
  }

}

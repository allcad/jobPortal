import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-contractor-advice-article',
  templateUrl: './contractor-advice-article.component.html',
  styleUrls: ['./contractor-advice-article.component.css']
})
export class ContractorAdviceArticleComponent implements OnInit {
	articleId;
	articleData;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	this.articleId = this._commonRequestService.getDataWithoutObserval("adviceArticleId");
  	if(!this.articleId){
  		this.articleId = localStorage.getItem("adviceArticleId");
  	}

  	this.getArticleData(this.articleId)
  }

  getArticleData(articleId){
  	if(articleId){
  		let input = {
  			"id" : articleId
  		};
  		let url = " http://dev.contractrecruit.co.uk/contractor_admin/api/post/page/advice/article/single";

  		this._commonRequestService.postData(url, input)
  			.subscribe(data=>{
  				console.log("artciledata",data);
  				this.articleData = data.data;
  			})
  	}	
  }

}

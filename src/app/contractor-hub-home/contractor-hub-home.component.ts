import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-contractor-hub-home',
  templateUrl: './contractor-hub-home.component.html',
  styleUrls: ['./contractor-hub-home.component.css']
})
export class ContractorHubHomeComponent implements OnInit {
	isPublic;
  keyWord;
  constructor(private _router: Router, private _routes: ActivatedRoute, private _commonRequestService: CommonRequestService, private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {

  	if (this._router.url.split('/')[1] == "public") {
			this.isPublic = true;
		}
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }


  updateAvailablity(){
  	if(this.isPublic){
  		this._router.navigate(['../contractorSignup'], {relativeTo: this._routes})
  	}else{
  		this._router.navigate(['../EditProfile'], {relativeTo: this._routes})
  	}
  }


  search(){
    this._commonDataSharedService.contractorHubSearch.next(this.keyWord);
    // if(this.keyWord){
    //   let input = {
    //   "page": 1,
    //   "limit": -1,
    //   "category_type": "contractor",
    //   "search": this.keyWord

    // };
    // let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/help_article_by_category_type";
    // this._commonRequestService.postData(url, input).subscribe(
    //   data => {
    //     console.log(data);
    //   }, err => {
    //     console.log("err", err);
    //   }
    // );
    // }
  }

}

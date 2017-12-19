import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-help',
  templateUrl: './recruiter-help.component.html',
  styleUrls: ['./recruiter-help.component.css']
})
export class RecruiterHelpComponent implements OnInit {
helpCategoryList;
  helpData;
  searchKeyword;
  searchType = "Recruiters";
  loading = true;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getHelpCategory()
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }

  getHelpCategory() {
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/help_category";
    this._commonRequestService.getData(url).subscribe(
      data => {
        this.helpCategoryList = data.data;
        for(let i=0; i<this.helpCategoryList.length; i++){
          if(this.helpCategoryList[i].category_type.toLowerCase().includes('contra')){
            this.getHelpByCategoryId(this.helpCategoryList[i]._id)    
          }
        }
        
        console.log("this.helpCategoryList", this.helpCategoryList)
      }
    );
  }


  getHelpByCategoryId(categoryId) {
    this.loading = true;
    this.helpData = [];
    let input = {
      category: categoryId,
      "page": 1,
      "limit": -1
    };
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/help_article_by_category";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        this.helpData = data.data;
        console.log(this.helpData);
        this.loading = false;
      }, err => {
        console.log("err", err);
      }
    );
  }


  searchHelp() {
     this.loading = true;
     let input = {
      "page": 1,
      "limit": -1,
      "category_type": this.searchType,
      "search": this.searchKeyword

    };
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/help_article_by_category_type";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        if(data.status == "TRUE"){
          this.helpData = data.data;
        }else{
          this.helpData = [];
        }
        this.loading = false;
        
      }, err => {
        console.log("err", err);
      }
    );
  }


}

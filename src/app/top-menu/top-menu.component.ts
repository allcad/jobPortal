import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
	jobSearchFlag = false;
	itRecruiterFlag = false;
	itContractorFlag = false;
	aboutContractRecruitFlag = false;
  categoryData = [];
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes:ActivatedRoute) { }

  ngOnInit() {
    this.getServiceCategory();
  }


  getServiceCategory(){
    var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/category";
    var inputJson = {
      "email" : "test@gmail.com",
      "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
    }
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          console.log("categoryData", data.data)
          this.categoryData = data.data; 
        }
    );
  }

  categoryClicked(categoryData){
    this._commonRequestService.setDataWithoutObserval(categoryData.contract_hub_category_id, 'category_hub_id');
    this._router.navigate(['../public/contractor-directory'], {relativeTo: this._routes});
    this.removeClass();
  }


  removeClass() {          
    $(".navigation-dropdown").slideUp();
  }

  mouseEnter(className) {
    let cName = className;
    console.log("mousse enter--", $(this), className);
     $("."+cName).children().slideDown(); 
    //$(".navigation-dropdown").parent().slideDown();
  }

  mouseLeave(className) {
    let cName = className;
   $("."+cName).slideUp(); 
  }

}

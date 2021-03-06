import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
import { CommonService } from '../commonService.service';
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
  menuList;

  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute,
    private _commonDataShareService: CommonDataSharedService, private commonService: CommonService) { }

  ngOnInit() {
    this.getServiceCategory();
    this.getMenuData()
  }

  getMenuData() {
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/menu";
    this._commonRequestService.getData(url).subscribe(
      data => {
        this.menuList = data.data;
        console.log("this.menuList", this.menuList);
        for(let i=0; i<this.menuList.length; i++){
          if(this.menuList[i].manu_label == 'IT Contractors'){
            this.menuList[i].subpages.unshift({"manu_label" : "Join Us on ContractRecruit", "pages": [{"manu_label" : "Login", "menu_link": "public/contractorLogin"}, {"manu_label" : "Sign Up", "menu_link": "public/contractorSignup"}]});
          }else if(this.menuList[i].manu_label == 'IT Recruiters'){
            this.menuList[i].subpages.unshift({"manu_label" : "Join Us on ContractRecruit", "pages": [{"manu_label" : "Login", "menu_link": "public/recruiterLogin"}, {"manu_label" : "Sign Up", "menu_link": "public/recruiterRegister"}, {"manu_label" : "Why Should I Sign Up", "menu_link": "public/about-recruiter"}]});
          }
        }

        console.log("this.menuList", this.menuList)
      }
    );
  }

  getServiceCategory() {
    var url = "http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/category";
    var inputJson = {
      "email": "test@gmail.com",
      "loginToken": "$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
    }
    this._commonRequestService.postData(url, inputJson).subscribe(
      data => {
        console.log("categoryData", data.data)
        this.categoryData = data.data;
      }
    );
  }

  categoryClicked(categoryData, event) {
    this._commonRequestService.setDataWithoutObserval(categoryData.contract_hub_category_id, 'category_hub_id');
    this._router.navigate(['../public/directory/' + categoryData.contract_hub_category_id], { relativeTo: this._routes });
    this._router.navigate(['../public/home'], { skipLocationChange: true }).then(() =>
      this._router.navigate(['../public/directory/' + categoryData.contract_hub_category_id], { relativeTo: this._routes })
    );


    this.removeClass('secondli', event);
  }


  removeClass(className, event?) {
    // this.commonService.setSessionData(false);
    // $(".navigation-dropdown").slideUp();

    document.querySelector('.' + className).classList.remove('show');
    document.querySelector('.' + className).classList.remove('showM');
    event.stopPropagation();
  }


  toggleMenu(className) {
    // if(className == 'firstli'){
    //   document.querySelector('.secondli').classList.remove('showM');
    //   document.querySelector('.thirdli').classList.remove('showM');
    //   document.querySelector('.fourli').classList.remove('showM');
    // }
    // else if(className == 'secondli'){
    //   document.querySelector('.firstli').classList.remove('showM');
    //   document.querySelector('.thirdli').classList.remove('showM');
    //   document.querySelector('.fourli').classList.remove('showM');
    // }
    document.querySelector('.' + className).classList.toggle('showM');

    // let menuGroup = ['firstli', 'secondli', 'thirdli', 'fourli'];
    // for(let i=0; i<menuGroup.length; i++){
    //   if(menuGroup[i] != className){
    //      document.querySelector('.' + className).classList.remove('showM');     
    //   }else{
    //    document.querySelector('.' + className).classList.toggle('showM');     
    //   }
    // }


  }

  mouseEnter(className) {
    document.querySelector('.' + className).classList.add('show');
    // let cName = className;
    // console.log("mousse enter--", $(this), className);
    // $("." + cName).children().slideDown();
    //$(".navigation-dropdown").parent().slideDown();
  }

  mouseLeave(className) {
    let cName = className;
    $("." + cName).slideUp();
  }

  moveToTerms(value) {
    var obj = { 'value': value };
    localStorage.setItem('termsValue', JSON.stringify(obj));
    this._commonDataShareService.termsAndUsePage.next(value);
    this._router.navigate(['/public/privacy-policy']);
  }

  moveToAboutPage(value) {
    this._commonDataShareService.switchToDivSubject.next(value);
    this._router.navigate(['/public/about-contractor']);
  }

  moveToSearchResult(value) {
    //this._commonDataShareService.advancedSerahcResult.next(value);
    var searchJson = {
      "recuriter_search_job_title": value ? value : '',
      "recuriter_search_keywords": '',
      "recuriter_search_stemmed_terms": 0,
      "recuriter_search_core_skills": '',
      "recuriter_search_certifications": '',
      "recuriter_search_dont_show_to_contractor": '',
      "recuriter_search_location": '',
      "recuriter_search_include_relocators": 0,
      "recuriter_search_by_rate_min": '',
      "recuriter_search_by_rate_max": '',
      "recuriter_search_by_rate_type": '',
      "recuriter_search_by_time_left": '',
      "recuriter_search_by_unavailable": 1,
      "recuriter_search_by_updated_contractor_since": '',
      "recuriter_search_by_contract_name": '',
      "recuriter_search_by_education": '',
      "recuriter_search_by_industry": '',
      "recuriter_search_by_security_clearance": '',
      "recuriter_search_by_driving_license": 0,
      "postcode": '',
      "display_town": '',
      "display_county": '',
      "display_name": ''
    }
    console.log("searchJson", searchJson);
    //this.commonService.setSearchResult(searchJson);
    this._router.navigate(['../public/home'], { skipLocationChange: true }).then(() =>
      this._router.navigate(['../public/searchresult-loggedin'], { 'relativeTo': this._routes, queryParams: searchJson })
    );
    //this._router.navigate(['/public/searchresult-loggedin/'+value]);
  }

  searchContract(key, value, event) {
    let inputJson = {
      contractor_search_by_job_title: "",
      contractor_search_by_keywords: "",
      contractor_search_by_exclude_words: "",
      contractor_search_by_miles: "",
      contractor_search_by_location: "",
      contractor_search_by_rate_min: "",
      contractor_search_by_rate_max: "",
      contractor_search_by_rate_type: "",
      contractor_search_by_job_reference_number: "",
      contractor_search_by_posted_contact_since: "",
      contractor_search_by_industry_sector: "",
      postcode: "",
      display_town: "",
      display_county: "",
      display_name: "",
      page: 1,
      limit: 10,
      sort: 1
    }

    if (key && value) {
      inputJson[key] = value;
    }

    inputJson.contractor_search_by_location = inputJson.display_name;

    localStorage.setItem("jobSearch", JSON.stringify(inputJson));

    this._router.navigate(['../public/home'], { skipLocationChange: true }).then(() =>
      this._router.navigate(['../public/contractor_search'], { 'relativeTo': this._routes, queryParams: inputJson })
    );

    this.removeClass('firstli', event)
  }

  menuClicked(data){
    this._commonDataShareService.headerAdChange.next(data);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header-ads',
  templateUrl: './header-ads.component.html',
  styleUrls: ['./header-ads.component.css']
})
export class HeaderAdsComponent implements OnInit {

  add;
  pageArray = [{'text' : 'Contractor Guide videos', 'value' :   '/public/guides'},
 {'text' : 'Recruiter Guide videos', 'value' : '/public/guides'  },
 {'text' : 'About us', 'value' :  '/public/about-contractor' },
 {'text' : 'What we do', 'value' :  '/public/about-contractor' },
 {'text' : 'Who we are', 'value' :  '/public/about-contractor' },
 {'text' : 'FAQ', 'value' :  '/public/faq' },
 {'text' : 'Job Search', 'value' : '/public/jobSearch'  },
 {'text' : 'Search results', 'value' :  '/public/contractor_search' },
 {'text' : 'Logout Header', 'value' :  '/public/home' }];
 
  constructor(private _commonRequestService: CommonRequestService, private _commonDataSharedService: CommonDataSharedService, private _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let page = this.pageArray.filter(item=>{return item.value == this._router.url})[0];
        if(page && page.text){
          this.getAdData(page.text);
        }else{
          this.getAdData("Logout Header");
        }
      }
    })
  }

  ngOnInit() {
    this.getAdData("Logout Header");
    this._commonDataSharedService.headerAdChange.subscribe(data => {
      console.log("headerChange", data)
    })
  }


  getAdData(pageName) {
    let input = { "page": pageName };
    let url = "http://dev.contractrecruit.co.uk/contractor_admin/api/get/rotating_banners";
    this._commonRequestService.postData(url, input).subscribe(
      data => {
        if(data.status == 'TRUE'){
          this.add = data.data[0];  
        }
        
      }
    );
  }

}

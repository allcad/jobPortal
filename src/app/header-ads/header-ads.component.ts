import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-header-ads',
  templateUrl: './header-ads.component.html',
  styleUrls: ['./header-ads.component.css']
})
export class HeaderAdsComponent implements OnInit {

  add;
  constructor(private _commonRequestService: CommonRequestService, private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {
  	this.getAdData();

    this._commonDataSharedService.headerAdChange.subscribe(data=>{
      console.log("headerChange",data)
    })
  }

  
  getAdData(){
    let input = {"page":"About us"};
  	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/rotating_banners";
      this._commonRequestService.postData(url, input).subscribe(
        data => {
          this.add = data.data[0];
          console.log(this.add);
        }
    );
  }

}

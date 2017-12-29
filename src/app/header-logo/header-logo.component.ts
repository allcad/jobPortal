import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.css']
})
export class HeaderLogoComponent implements OnInit {
  logoImage;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
   // this.getLogoData();
  }

  // getLogoData(){
  // 	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/logo";
  //     this._commonRequestService.getData(url).subscribe(
  //       data => {
  //         this.logoImage = data.data;
  //         console.log("logoImage",this.logoImage);
  //       }
  //   );
  // }

}

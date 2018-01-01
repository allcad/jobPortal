import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.css']
})
export class HeaderLogoComponent implements OnInit {
  logoImage;
  wsError = "";
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getLogoData();
  }

  getLogoData(){
    this.wsError = "";
   var input = {
    "page":1,
    "limit":-1
   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/logo";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("all logo data", data);
         if(data && data.status === "TRUE") {
          this.logoImage = data.data[0];
           this.wsError = "";
          } else {
            if(data && data.status === "FALSE") {
              this.wsError = typeof (data.error) == 'object' ? data.error[0] : data.error;
            }
          }
        }
    );
  }

}

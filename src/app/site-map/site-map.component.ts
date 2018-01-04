import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit {
  menuList;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getMenuData();
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

}

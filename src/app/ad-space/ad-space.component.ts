import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-ad-space',
  templateUrl: './ad-space.component.html',
  styleUrls: ['./ad-space.component.css']
})
export class AdSpaceComponent implements OnInit {
	addList;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	this.getAdsList();
  }

  getAdsList(){
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/ads";
    var inputJson = {
      "email" : "test@gmail.com",
      "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"

    }
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          console.log("addData", data)
        }
    );
  }

}

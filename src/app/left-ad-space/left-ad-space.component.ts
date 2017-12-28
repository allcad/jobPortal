import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-left-ad-space',
  templateUrl: './left-ad-space.component.html',
  styleUrls: ['./left-ad-space.component.css']
})
export class LeftAdSpaceComponent implements OnInit {
	add;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	this.getAdData();
  }

  
  getAdData(){
  	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/get/staticpages/left_Ad";
      this._commonRequestService.getData(url).subscribe(
        data => {
          this.add = data.data;
          console.log("add",this.add);
        }
    );
  }


}

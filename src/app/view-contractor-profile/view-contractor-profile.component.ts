import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonRequestService } from '../common-request.service';
import { CommonDataSharedService } from '../commonDataSharedService';
@Component({
  selector: 'app-view-contractor-profile',
  templateUrl: './view-contractor-profile.component.html',
  styleUrls: ['./view-contractor-profile.component.css']
})
export class ViewContractorProfileComponent implements OnInit {

  	errorMsgFlag;
	contractorData;;
	errorMsg
	currentContractorId;
	currentContractorFirstName;
	currentContractorLastName;
	certification = [];
	keySkills = [];
  type;
  constructor(private router: Router, public _commonRequestService: CommonRequestService,
  	private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {

  	this.currentContractorId = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorId'] : null;
	
  	this.getContractorData();

  }

  getContractorData() {
  	let input = {
  		"contractor_reg_id":this.currentContractorId
  	};
  	var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/profile/view/globel";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
         console.log("contractor data--", data);
         if(data && data.status === "TRUE") {
           this.errorMsgFlag = false;
           this.contractorData = data.data;
           this.certification = data && data.data['certification'] ? data.data['certification'].split(","):'';
           this.keySkills = data && data.data['skill&Experience'] ? data.data['skill&Experience'].split(","):[];
           console.log("this.certification", this.certification);
           console.log("this.keySkills", this.keySkills);
           this.currentContractorFirstName = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorName'] : null;  	
	         //this.currentContractorLastName = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['currentContractorLastName'] : null;  	
           
          } else {
            if(data && data.error && data.error.length > 0) {
            this.errorMsgFlag = true;
              this.errorMsg = data.error[0];
            }
          }
        }
    );
  }

  moveToAnotherPage() {
    this.type = localStorage.getItem('currentContractorData') ? JSON.parse(localStorage.getItem('currentContractorData'))['type'] : null;    
    if(this.type === 'viewApplication') {
      this.router.navigate(['./recruiter/view-applications']);
    } else if(this.type === 'watchList') {
      this.router.navigate(['./recruiter/watch-list']);
    } else if(this.type === 'search-result') {
      this.router.navigate(['./recruiter/searchresult-loggedin']);
    }
  }

}

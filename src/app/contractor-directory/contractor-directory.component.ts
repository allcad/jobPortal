import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';


@Component({
  selector: 'app-contractor-directory',
  templateUrl: './contractor-directory.component.html',
  styleUrls: ['./contractor-directory.component.css']
})
export class ContractorDirectoryComponent implements OnInit {
	selectedContractorHubCategory;
	categoryData = [];
	companyData;
  constructor(private _commonRequestService: CommonRequestService) { }

  ngOnInit() {
  	this.getContarctorHubCategory();
  	 this.selectedContractorHubCategory = this._commonRequestService.getDataWithoutObserval('category_hub_id');
  	 if(this.selectedContractorHubCategory){
  	 	this.getCompanyList();
  	 }
  }

  categoryClicked(categoryData){
  	console.log(categoryData);
  	this.selectedContractorHubCategory = categoryData.contract_hub_category_id;
  	this.getCompanyList();
  }

  getCompanyList(){
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/company";
  	var inputJson = {
  		"email" : "test@gmail.com",
  		"loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
  		"hub_category":this.selectedContractorHubCategory,
		"limit":20,
		"page":1
  	}
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.companyData = data;
         }
    );
  }

  getContarctorHubCategory(){
  	var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/category";
  	var inputJson = {
  		"email" : "test@gmail.com",
  		"loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
  	}
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.categoryData = data.data;
          if(!this.selectedContractorHubCategory){
          	this.selectedContractorHubCategory = this.categoryData[0].contract_hub_category_id;
  			this.getCompanyList();
          }
        }
    );
  }

  navigateToWeb(webAddress){
  	window.open(webAddress, "_blank");
  }

  

}

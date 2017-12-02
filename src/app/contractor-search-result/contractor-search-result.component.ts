import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-contractor-search-result',
  templateUrl: './contractor-search-result.component.html',
  styleUrls: ['./contractor-search-result.component.css']
})

export class ContractorSearchResultComponent implements OnInit {

  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }
  totalRecords;
  searchResult = [];
  filteredData = []
  sortOptionsList = [];
  cvList = [];
  coverList = [];
  sort = 1;
  searchJson;
  isPublic = false;
  selectedCover;
  selectedCv;
  jobDetail;
  currentPage = 1;
  totalPage;
  loading;
  ngOnInit() {
  	console.log(JSON.parse(localStorage.getItem("jobSearch")));
  	this.searchJson = JSON.parse(localStorage.getItem("jobSearch"));
  	this.getSearchData();
    this.getSortList();
    if(this._router.url.split('/')[1] == "public"){
      this.isPublic = true;
    }


  }

  getSortList(){
    let url = 'http://dev.contractrecruit.co.uk/contractor_admin/api/get/short_by_contractor_search';
    this._commonRequestService.getData(url)
      .subscribe(data=>{
        this.sortOptionsList = data.data;
      })


  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }



  getSearchData(flag=false){
    this.searchJson.sort = this.sort;
    this.searchJson.page = flag ? this.currentPage : 1;
    this.searchJson.limit = 5;
    this.loading = true;
  	let url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/search";
  	this._commonRequestService.postData(url,this.searchJson)
  		.subscribe(data=>{
        this.loading = false;
  			if(data.status == "TRUE"){
          if(flag){
  				  this.searchResult = this.searchResult.concat(data.data); 
          } else{
            this.searchResult = data.data; 
          }
          this.totalPage = data.TotalPage;
  				this.totalRecords = data.recordsTotal;
  			} else{
  				if(data.error == "No Record Found"){
  					this.totalRecords = 0;
            this.totalPage = 0;
            this.searchResult = [];
  				}
  			}
  		})
  }


  applyJob(jobDetail){
    if(jobDetail.applyed !== 1){
      $('#myModal').modal();
      this.jobDetail = jobDetail;
      this.getCVList()

    }
  }


  getCVList(){
    var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/cv_cl_list";
      var inputJson = {
      "email" : "test@gmail.com",
      "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"

    }
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          console.log("data", data);
          this.cvList = data.data.uploadCV;
          this.coverList = data.data.uploadCoverLetter;
        }
    );
  }

  apply(){
    var url =" http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/job/apply";
      var inputJson = {
      "email" : "test@gmail.com",
      "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK",
      "jobid": this.jobDetail.jobid,
      "cv":this.selectedCv,
      "cl":this.selectedCover
     }
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          this.jobDetail.applyed = 1;
        }
    );
  }


  getRangeSliderValue(event){
    // this.filteredData = this.searchResult.filter(item=>{
    //   return  item.prefereedRate.minRate>event.from && item.prefereedRate.maxRate<event.to
    // })

    this.searchJson.contractor_search_by_rate_min = event.from;
    this.searchJson.contractor_search_by_rate_max = event.to;
    this.getSearchData();
  }


  refineSearch(){
    this._router.navigate(['../lastSearch'], {relativeTo: this._routes});
  }

  newSearch(){
    this._router.navigate(['../jobSearch'], {relativeTo: this._routes});
  }

  login(){
   this._router.navigate(['../contractorLogin'], {relativeTo: this._routes}); 
  }

  signup(){
    this._router.navigate(['../contractorSignup'], {relativeTo: this._routes});
  }
}

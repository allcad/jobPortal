import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractor-hub-home',
  templateUrl: './contractor-hub-home.component.html',
  styleUrls: ['./contractor-hub-home.component.css']
})
export class ContractorHubHomeComponent implements OnInit {
	isPublic;
  constructor(private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {

  	if (this._router.url.split('/')[1] == "public") {
			this.isPublic = true;
		}
  }

  ngAfterViewInit(){
   window.scroll(0,0);
  }


  updateAvailablity(){
  	if(this.isPublic){
  		this._router.navigate(['../contractorSignup'], {relativeTo: this._routes})
  	}else{
  		this._router.navigate(['../EditProfile'], {relativeTo: this._routes})
  	}
  }

}

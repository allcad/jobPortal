import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../common-request.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contractor-header',
  templateUrl: './contractor-header.component.html',
  styleUrls: ['./contractor-header.component.css']
})
export class ContractorHeaderComponent implements OnInit {
  showMenu = false;
  constructor(private _commonRequestService: CommonRequestService, private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
  	
  }

  logout(){
  	
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  logoutContractor(){
    this._commonRequestService.postData("http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/signout", {email: "test@gmail.com", loginToken : "kbasgdkadk"})
      .subscribe(data=>{
        localStorage.removeItem("loginDetail");
        this._router.navigate(['/public'], {relativeTo : this._routes});
      })
  }

}

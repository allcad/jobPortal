import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent implements OnInit {

  constructor(private _router: Router, private _routes: ActivatedRoute) { }

  ngOnInit() {
  }

  loginClick(){
  	/*this._router.navigate(['../contractorLogin']);*/
  	
  }

}

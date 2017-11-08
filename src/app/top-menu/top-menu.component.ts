import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
	jobSearchFlag = false;
	itRecruiterFlag = false;
	itContractorFlag = false;
	aboutContractRecruitFlag = false;
  constructor() { }

  ngOnInit() {
  }

  removeClass() {
    //document.querySelector(".navigation-dropdown")['style']['display'] = 'none';
    //console.log("dropDownClass", document.querySelector(".navigation-dropdown"));
  }

}

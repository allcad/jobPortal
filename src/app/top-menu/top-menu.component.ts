import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
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
    $(".navigation-dropdown").slideUp();
  }

  mouseEnter(className) {
    let cName = className;
    console.log("mousse enter--", $(this), className);
     $("."+cName).children().slideDown(); 
    //$(".navigation-dropdown").parent().slideDown();
  }

  mouseLeave(className) {
    let cName = className;
   $("."+cName).slideUp(); 
  }

}

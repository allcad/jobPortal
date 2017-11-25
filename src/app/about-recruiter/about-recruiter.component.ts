import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-recruiter',
  templateUrl: './about-recruiter.component.html',
  styleUrls: ['./about-recruiter.component.css']
})
export class AboutRecruiterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	 //$(".roket").animate({top: '-10px'});
  	$(document).on('scroll', function() {
    if($('.roket') && $('.roket').position() && $('.roket').position().top && $(this).scrollTop()>=$('.roket').position().top){
        $(".roket").animate({top: '0px'},'slow',function(){});
    }
    if($('.roket_arrow') && $('.roket_arrow').position() ){
        $(".roket_arrow").animate({right: '+=10', top: '+=10'},'slow',function(){        	
        });
    }
    // if($(".footer_bottom")) {
    // 	$(".roket_arrow").stop(true,true);
    // 	// alert("in");
    // }
})
  }

}

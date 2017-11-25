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
      let currentHeight = $(this).height();
    if($('.roket') && $('.roket').position() && $('.roket').position().top && $(this).scrollTop()>=$('.roket').position().top){
        $(".roket").animate({top: '55px'},'slow',function(){});
    }
    var isAnimating = $('.roket_arrow').is(':animated');
    console.log('isAnimating--', isAnimating, $('.roket_arrow').css('top'));
    if ($('.roket_arrow').css('top') && parseInt($('.roket_arrow').css('top').split("px")[0]) <= 190)      {
    if($('.roket_arrow') && $('.roket_arrow').position()){
        $(".roket_arrow").animate({right: '+=10', top: '+=10'},'fast',function(){    
          console.log($(this).css('top'));
          if ($('.roket_arrow').css('top') && parseInt($('.roket_arrow').css('top').split("px")[0]) >= 190)    	{
             $(this).stop(true,true);
          }
        });
    }

    }
    // var pTop = parseInt($('.roket_arrow').css('top'));
    //     console.log("pTop--", pTop);
    //     if (pTop === 80) {
    //       $(".roket_arrow").stop(true,true);
    //     }
    //console.log( parseInt($(this).scrollTop().toString()) , parseInt(($(document).height() - $(window).height() - $(".roket_arrow").height()).toString()));
    // if ( parseInt($(this).scrollTop().toString()) == parseInt(($(document).height() - $(window).height()).toString())) {
    //   $(".roket_arrow").stop(true,true);
    // }
    // if($(".footer_bottom")) {
    // 	$(".roket_arrow").stop(true,true);
    // 	// alert("in");
    // }
})
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-contractor',
  templateUrl: './about-contractor.component.html',
  styleUrls: ['./about-contractor.component.css']
})
export class AboutContractorComponent implements OnInit {

  constructor() { }
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
  }
  ngOnInit() {

  	$(document).on('scroll', function() {
      let currentHeight = $(this).height();
    if($('#contractorroket') && $('#contractorroket').position() && $('#contractorroket').position().top && $(this).scrollTop()>=$('#contractorroket').position().top){
        $("#contractorroket").animate({top: '50px'},'slow',function(){});
    }
    var isAnimating = $('#contractorroketarrow').is(':animated');
    console.log('isAnimating--', isAnimating, $('#contractorroketarrow').css('top'));
    if ($('#contractorroketarrow').css('top') && parseInt($('#contractorroketarrow').css('top').split("px")[0]) <= 80)      {
    if($('#contractorroketarrow') && $('#contractorroketarrow').position()){
        $("#contractorroketarrow").animate({right: '+=10', top: '+=10'},'fast',function(){    
          console.log($(this).css('top'));
          if ($('#contractorroketarrow').css('top') && parseInt($('#contractorroketarrow').css('top').split("px")[0]) >= 80)    	{
             $(this).stop(true,true);
          }
        });
    }

    }
    // var isAnimating = $('.contractorroketarrow').is(':animated');
    // if (!isAnimating && $('.contractorroketarrow').css('top') <= '80px') {    	
    // if($('.contractorroketarrow') && $('.contractorroketarrow').position()){
    //     $(".contractorroketarrow").animate({right: '+=10', top: '+=10'},'slow',function(){    
    //       console.log($(this).css('top'));
    //       if ($(this).css('top') > '80px')    	{
    //          $(this).stop(true,true);
    //       }
    //     });
    // }


    // }
    // var pTop = parseInt($('.contractorroketarrow').css('top'));
    //     console.log("pTop--", pTop);
    //     if (pTop === 80) {
    //       $(".contractorroketarrow").stop(true,true);
    //     }
    //console.log( parseInt($(this).scrollTop().toString()) , parseInt(($(document).height() - $(window).height() - $(".contractorroketarrow").height()).toString()));
    // if ( parseInt($(this).scrollTop().toString()) == parseInt(($(document).height() - $(window).height()).toString())) {
    //   $(".contractorroketarrow").stop(true,true);
    // }
    // if($(".footer_bottom")) {
    // 	$(".contractorroketarrow").stop(true,true);
    // 	// alert("in");
    // }
})
  }

}

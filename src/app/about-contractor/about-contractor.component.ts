import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CommonDataSharedService } from '../commonDataSharedService';

@Component({
  selector: 'app-about-contractor',
  templateUrl: './about-contractor.component.html',
  styleUrls: ['./about-contractor.component.css']
})
export class AboutContractorComponent implements OnInit {
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    autoplay : 3000
  }

  title;
  @ViewChild("search") public searchElementRef: ElementRef;

  postcode;
  displayTown;
  displayCountry;
  displayLocationName;

  constructor(private _router: Router, private _routes: ActivatedRoute, private ngZone: NgZone, private _commonDataSharedService: CommonDataSharedService) { }

  ngOnInit() {
    this._commonDataSharedService.switchToDivSubject.subscribe((data) =>{
          if(data) {
            //console.log("data--", data);

            if (data === 'contractRecruit') {
              setTimeout(function(){
              if ($('#contractrecurit') && $('#contractrecurit').offset())
              $(window).scrollTop($('#contractrecurit').offset().top);
             },100); 
            }
            if (data === "whoAreWe") {
              setTimeout(function(){
              if ($('#whoarewe') && $('#whoarewe').offset())
             $(window).scrollTop($('#whoarewe').offset().top);
             },100); 
            }
            if (data === "whatWeDo") {
              setTimeout(function(){
               if ($('#whatdowedo') && $('#whatdowedo').offset())
               $(window).scrollTop($('#whatdowedo').offset().top); 
              },100);
            }

            
          }
        });

    $(document).on('scroll', function() {
      let currentHeight = $(this).height();
      if ($('#contractorroket') && $('#contractorroket').position() && $('#contractorroket').position().top && $(this).scrollTop() >= $('#contractorroket').position().top) {
        $("#contractorroket").animate({ top: '50px' }, 'slow', function() { });
      }
      var isAnimating = $('#contractorroketarrow').is(':animated');
      console.log('isAnimating--', isAnimating, $('#contractorroketarrow').css('top'));
      if ($('#contractorroketarrow').css('top') && parseInt($('#contractorroketarrow').css('top').split("px")[0]) <= 80) {
        if ($('#contractorroketarrow') && $('#contractorroketarrow').position()) {
          $("#contractorroketarrow").animate({ right: '+=10', top: '+=10' }, 'fast', function() {
            console.log($(this).css('top'));
            if ($('#contractorroketarrow').css('top') && parseInt($('#contractorroketarrow').css('top').split("px")[0]) >= 80) {
              $(this).stop(true, true);
            }
          });
        }

      }
    })

   
    
  }

  


 locationSelecetd(location) {
    this.postcode = location.postcode;
    this.displayTown = location.town_name;
    this.displayCountry = location.country;
    this.displayLocationName = location.town_name + ',' + location.country;
  }

  changeText(text) {
    if (typeof text == "string") {
      this.postcode = "";
      this.displayTown = "";
      this.displayCountry = "";
      this.displayLocationName = text;
    }

  }


  searchContract(title) {
    let inputJson = {
      contractor_search_by_job_title: title,
      contractor_search_by_keywords: "",
      contractor_search_by_exclude_words: "",
      contractor_search_by_miles: "",
      contractor_search_by_location: this.displayLocationName,
      contractor_search_by_rate_min: "",
      contractor_search_by_rate_max: "",
      contractor_search_by_rate_type: "",
      contractor_search_by_job_reference_number: "",
      contractor_search_by_posted_contact_since: "",
      contractor_search_by_industry_sector: "",
      postcode : this.postcode,
      display_town : this.displayTown,
      display_county : this.displayCountry,
      display_name : this.displayLocationName ,
      page: 1,
      limit: 10,
      sort: 1
    }

    localStorage.setItem("jobSearch", JSON.stringify(inputJson));
    //this._router.navigate(['../searchResult'], { 'relativeTo': this._routes })
    this._router.navigate(['../contractor_search'], { 'relativeTo': this._routes, queryParams :  inputJson} )
  }

  searchBoxBlank(){
    
  }


}

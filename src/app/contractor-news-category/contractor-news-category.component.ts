import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contractor-news-category',
  templateUrl: './contractor-news-category.component.html',
  styleUrls: ['./contractor-news-category.component.css']
})
export class ContractorNewsCategoryComponent implements OnInit {
	config : SwiperOptions = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        }
  constructor() { }

  ngOnInit() {
  }

}

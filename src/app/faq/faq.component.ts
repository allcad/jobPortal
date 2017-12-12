import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleAccordian(id) {
  	if ($("#"+id).hasClass('in')) {
  		//$("#"+id).removeClass('in');
  		if($("#"+id).parent().find('span').hasClass('glyphicon-minus')) {
  			$("#"+id).parent().find('span').removeClass('glyphicon-minus');
  			$("#"+id).parent().find('span').addClass('glyphicon-plus');
  			$("#"+id).removeClass('in');
  		} else {
  			$("#"+id).parent().find('span').removeClass('glyphicon-plus');
  			$("#"+id).parent().find('span').addClass('glyphicon-minus')
  		}
  	} 
  }

}

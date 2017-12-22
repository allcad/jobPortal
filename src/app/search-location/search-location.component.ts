import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonRequestService } from '../common-request.service';

@Component({
	selector: 'app-search-location',
	templateUrl: './search-location.component.html',
	styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {
	
	searchResult;
	selecetd;
	
	@Input('text') location: string;
	@Input('placeHolder') placeHolder: string;

	@Output('select') selectText = new EventEmitter<any>();
	@Output('blank') textBoxBlank = new EventEmitter<any>();
	@Output('change') change = new EventEmitter<any>();



	constructor(private _commonRequestService: CommonRequestService) { }

	ngOnInit() {
	}




	searchLocation() {
		this.change.emit(this.location);
		if (this.location && this.location.length > 2) {
			this.selecetd = false;
			this._commonRequestService.postData("http://dev.contractrecruit.co.uk/contractor_admin/api/post/fatch_location_list", { location: this.location })
				.subscribe(data => {
					console.log("search", data);
					this.searchResult = data.data;
				})
		} else if (!this.location || this.location.length == 0) {
			this.textBoxBlank.emit();
			this.searchResult = [];
		}else{
			this.searchResult = [];
		}
	}


	locationSelected(location) {
		this.location = location.town_name + ', ' + location.country;
		this.selecetd = true;
		this.selectText.emit(location);
	}


	updateText(text){
		this.location = text;
	}

}

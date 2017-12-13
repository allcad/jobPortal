import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataSharedService } from './commonDataSharedService';
import 'rxjs/add/operator/map';  // we need to import this now
@Injectable()
export class CommonRequestService {
	inputUrl; inputData;
	objectData = {}
	// headers = new Headers({
	// 	'X-CSRF-Token': undefined
	// }); // variable used to store headers field values
	// options = new RequestOptions({ headers: this.headers });

	constructor(private _http: Http, private _router: Router, private _routes: ActivatedRoute,
		private commonDataSharedService: CommonDataSharedService) {

	}

	getData(url: string) {
		return this._http.get(url)
			.map(data => {
				data.json();
				return data.json();
			});
	}

	postData(url, inputData) {
		if (inputData.loginToken && inputData.email) {
			let token = (localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).token) ? JSON.parse(localStorage.getItem('loginDetail')).token : inputData.loginToken;
			let email = (localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem('loginDetail')).email) ? JSON.parse(localStorage.getItem('loginDetail')).email : inputData.email;
			inputData.loginToken = token;
			inputData.email = email;

		};
		return this._http.post(url, inputData)
			.map(
			(response: Response) => {
				const data = response.json();
				if(data.auth_error && data.auth_error == 1){
					const localStorageData = localStorage.getItem('loginDetail') ?  JSON.parse(localStorage.getItem('loginDetail')) : "";
					if(localStorageData && localStorageData.role === 'contractor'){
						this._router.navigate(['/public/contractorLogin']);
					} else if(localStorageData && localStorageData.role === 'recuriter'){
						this.commonDataSharedService.loginMessage.next(true);
						this._router.navigate(['/public/recruiterLogin']);
					}else{
						this._router.navigate(['/public/home']);
					}
					localStorage.removeItem('loginDetail');
				}
				else if (data){
					return data;
				}
			})
	}

	setDataWithoutObserval(object, key) {
		this.objectData[key] = object;

	}
	getDataWithoutObserval(key) {
		return this.objectData[key];

	}

}


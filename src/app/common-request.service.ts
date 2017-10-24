import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';  // we need to import this now
@Injectable()
export class CommonRequestService {
inputUrl;inputData;
objectData={}
	constructor(private _http:Http){

	}

getData(url:string) {
    return this._http.get(url)
        .map(data => {
            data.json();
            return data.json();
    });
}

postData(url,inputData){
	this.inputUrl= url;
	this.inputData =inputData
	return this._http.post(this.inputUrl,this.inputData)
	.map(
		(response:Response)=>{
			const data=response.json();
			if(data)
				return data;
		})
}

setDataWithoutObserval(object,key){
	this.objectData[key] =object;

}
getDataWithoutObserval(key){
	return this.objectData[key];
	
}

}


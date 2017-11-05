import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, ActivatedRoute, CanActivate } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
export class ResolverService implements Resolve<any> {

  constructor(private router: Router, 
              private routes: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot) {
    let localStorageData = localStorage.getItem("loginDetail") ?  JSON.parse(localStorage.getItem("loginDetail")) : ""; 
    
    var currentRoute = route['_routerState'].url.split('/');
    console.log("currentRoute",currentRoute);

    /*condition of contractor page*/

    if(currentRoute && currentRoute[1] && currentRoute[1]== 'contractor'){
      if(localStorageData && localStorageData.role==='contractor'){
        return true;
      }else{
        this.router.navigate(['/public/home'], {relativeTo: this.routes});
      }
    }

    if(currentRoute && currentRoute[1] && currentRoute[1]== "recruiter"){
      if(localStorageData && localStorageData.role==="recruiter"){
        return true;
      }else{
        this.router.navigate(['/public/home'], {relativeTo: this.routes});
      }
    }

}
}





import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from '../content/content.component';
import { ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';

const publicRoutes: Routes = [
{
    "path": "contractorLogin",
    "component": ContractorSignUpComponent
},{
	"path": "",
    "component": ContentComponent
}, {
    "path": "recruiterRegister",
    "component": RecruiterSignUpComponent
}]

@NgModule({
    imports:[RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {


}
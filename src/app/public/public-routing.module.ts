import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from '../content/content.component';
import { ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';
import { ContractorRecuriterProfileComponent } from '../contractor-recuriter-profile/contractor-recuriter-profile.component';
import { ContractorDirectoryComponent } from '../contractor-directory/contractor-directory.component';

const publicRoutes: Routes = [
{
    "path": "contractorLogin",
    "component": ContractorSignUpComponent
}, {
    "path": "recruiterRegister",
    "component": RecruiterSignUpComponent
},{
    "path" :"contractor-directory",
    "component" :ContractorDirectoryComponent
},{
    "path": "companyProfile",
    "component": ContractorRecuriterProfileComponent
},{
    "path": "home",
    "component": ContentComponent
},{
    "path": "",
    "component": ContentComponent
}]

@NgModule({
    imports:[RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {


}
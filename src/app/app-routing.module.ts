import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ReferenceListComponent } from './components/reference-list/reference-list.component';
import { ContentComponent } from './content/content.component';
import { RecruiterSignUpComponent } from './recruiter-sign-up/recruiter-sign-up.component';
import {ContractorSignUpComponent } from './contractor-sign-up/contractor-sign-up.component';
import { ContractorProfileComponent } from './contractor-profile/contractor-profile.component';
import { ContractorViewProfileComponent } from './contractor-view-profile/contractor-view-profile.component';
import { RecruiterManagePasswordComponent } from './recruiter-manage-password/recruiter-manage-password.component';
import { RecruiterManageAccountComponent } from './recruiter-manage-account/recruiter-manage-account.component';
import { RecruiterManageProfileComponent } from './recruiter-manage-profile/recruiter-manage-profile.component';
import { RecruiterManageUserComponent } from './recruiter-manage-user/recruiter-manage-user.component';

const appRoutes: Routes = [{
    "path": "",
    "component": ContentComponent
}, {
    "path": "recruiters/register",
    "component": RecruiterSignUpComponent
}, {
    "path": "contractors/register",
    "component": ContractorSignUpComponent
}, {
    "path": "contractors/profile",
    "component": ContractorProfileComponent
}, {
    "path": "contractors/view-profile",
    "component": ContractorViewProfileComponent
}, {
    "path": "recruiters/manage-password",
    "component": RecruiterManagePasswordComponent
}, {
    "path": "recruiters/manage-account",
    "component": RecruiterManageAccountComponent
}, {
    "path": "recruiters/profile",
    "component": RecruiterManageProfileComponent
}, {
    "path": "recruiters/manage-user",
    "component": RecruiterManageUserComponent
}]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes , { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {


}
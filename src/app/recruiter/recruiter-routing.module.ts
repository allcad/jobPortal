import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ReferenceListComponent } from './components/reference-list/reference-list.component';

import { RecruiterManagePasswordComponent } from '../recruiter-manage-password/recruiter-manage-password.component';
import { RecruiterManageAccountComponent } from '../recruiter-manage-account/recruiter-manage-account.component';
import { RecruiterManageProfileComponent } from '../recruiter-manage-profile/recruiter-manage-profile.component';
import { RecruiterManageUserComponent } from '../recruiter-manage-user/recruiter-manage-user.component';


const recruiterRoutes: Routes = [{
    "path": "manage-password",
    "component": RecruiterManagePasswordComponent
}, {
    "path": "manage-account",
    "component": RecruiterManageAccountComponent
}, {
    "path": "profile",
    "component": RecruiterManageProfileComponent
}, {
    "path": "manage-user",
    "component": RecruiterManageUserComponent
}]

@NgModule({
    imports:[RouterModule.forChild(recruiterRoutes)],
    exports: [RouterModule]
})
export class RecruiterRoutingModule {


}
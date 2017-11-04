import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ReferenceListComponent } from './components/reference-list/reference-list.component';

import { RecruiterManagePasswordComponent } from '../recruiter-manage-password/recruiter-manage-password.component';
import { RecruiterManageAccountComponent } from '../recruiter-manage-account/recruiter-manage-account.component';
import { RecruiterManageProfileComponent } from '../recruiter-manage-profile/recruiter-manage-profile.component';
import { RecruiterManageUserComponent } from '../recruiter-manage-user/recruiter-manage-user.component';
//import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';

import { AboutRecruiterComponent } from '../about-recruiter/about-recruiter.component';
import { RecruiterAdvancedSearchComponent } from '../recruiter-advanced-search/recruiter-advanced-search.component';
import { RecruiterHelpComponent } from '../recruiter-help/recruiter-help.component';
import { RecruiterJobPostingComponent } from '../recruiter-job-posting/recruiter-job-posting.component';
import { RecruiterManageJobsComponent } from '../recruiter-manage-jobs/recruiter-manage-jobs.component';
import { RecruiterPreviewJobComponent } from '../recruiter-preview-job/recruiter-preview-job.component';
import { RecruiterSavedSearchComponent } from '../recruiter-saved-search/recruiter-saved-search.component';
import { RecruiterSearchresultLoggedinComponent } from '../recruiter-searchresult-loggedin/recruiter-searchresult-loggedin.component';
import { RecruiterViewApplicationsComponent } from '../recruiter-view-applications/recruiter-view-applications.component';
import { RecruiterViewProfileComponent } from '../recruiter-view-profile/recruiter-view-profile.component';
import { RecruiterWatchListComponent } from '../recruiter-watch-list/recruiter-watch-list.component';
import { RecruiterWatchdogComponent } from '../recruiter-watchdog/recruiter-watchdog.component';
import { ViewContractorProfileComponent } from '../view-contractor-profile/view-contractor-profile.component';


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
}, /*{
    "path": "register",
    "component": RecruiterSignUpComponent
}*/{
    "path": "about-recruiter",
    "component": AboutRecruiterComponent
}, {
    "path": "advanced-search",
    "component": RecruiterAdvancedSearchComponent
}, {
    "path": "help",
    "component": RecruiterHelpComponent
}, {
    "path": "job-posting",
    "component": RecruiterJobPostingComponent
}, {
    "path": "manage-jobs",
    "component": RecruiterManageJobsComponent
}, {
    "path": "preview-job",
    "component": RecruiterPreviewJobComponent
}, {
    "path": "saved-search",
    "component": RecruiterSavedSearchComponent
}, {
    "path": "searchresult-loggedin",
    "component": RecruiterSearchresultLoggedinComponent
}, {
    "path": "view-applications",
    "component": RecruiterViewApplicationsComponent
}, {
    "path": "view-profile",
    "component": RecruiterViewProfileComponent
},{
    "path": "view-contractor-profile",
    "component": ViewContractorProfileComponent
}, {
    "path": "watch-list",
    "component": RecruiterWatchListComponent
}, {
    "path": "watchdog",
    "component": RecruiterWatchdogComponent
}]

@NgModule({
    imports:[RouterModule.forChild(recruiterRoutes)],
    exports: [RouterModule]
})
export class RecruiterRoutingModule {


}
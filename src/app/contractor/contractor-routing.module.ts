import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ReferenceListComponent } from './components/reference-list/reference-list.component';
//import {ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { ContractorProfileComponent } from '../contractor-profile/contractor-profile.component';
import { ContractorViewProfileComponent } from '../contractor-view-profile/contractor-view-profile.component';
import { ContractorJobSearchComponent } from '../contractor-job-search/contractor-job-search.component';
import { ContractorApplicationsComponent } from '../contractor-applications/contractor-applications.component';
import { ContractorJobSearchSavedComponent } from '../contractor-job-search-saved/contractor-job-search-saved.component';
import { FindContractHubComponent } from '../find-contract-hub/find-contract-hub.component';



const contractorRoutes: Routes = [{
    "path": "profile",
    "component": ContractorProfileComponent
}, {
    "path": "viewProfile",
    "component": ContractorViewProfileComponent
},{
	"path" :"EditProfile",
	"component" :ContractorProfileComponent
},{
	"path" :"jobSearch",
	"component" :ContractorJobSearchComponent
},{
    "path" :"application",
    "component" :ContractorApplicationsComponent
},{
    "path" :"jobSavedSearch",
    "component" :ContractorJobSearchSavedComponent
},
{
    "path" :"hubHome",
    "component" :FindContractHubComponent
}]

@NgModule({
    imports:[RouterModule.forChild(contractorRoutes)],
    exports: [RouterModule]
})
export class ContractorRoutingModule {


}
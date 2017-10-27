import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorProfileComponent } from '../contractor-profile/contractor-profile.component';
import { ContractorViewProfileComponent } from '../contractor-view-profile/contractor-view-profile.component';
import { ContractorJobSearchComponent } from '../contractor-job-search/contractor-job-search.component';
import { ContractorApplicationsComponent } from '../contractor-applications/contractor-applications.component';
import { ContractorJobSearchSavedComponent } from '../contractor-job-search-saved/contractor-job-search-saved.component';
import { FindContractHubComponent } from '../find-contract-hub/find-contract-hub.component';
import { ContractorDirectoryComponent } from '../contractor-directory/contractor-directory.component';
import { ContractorRecuriterProfileComponent } from '../contractor-recuriter-profile/contractor-recuriter-profile.component';
 
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
}, {
     "path" :"contractor-directory",
    "component" :ContractorDirectoryComponent
}, {
    "path": "companyProfile",
    "component": ContractorRecuriterProfileComponent
}]

@NgModule({
    imports:[RouterModule.forChild(contractorRoutes)],
    exports: [RouterModule]
})
export class ContractorRoutingModule {


}
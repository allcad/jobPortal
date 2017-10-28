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
import { ContractorHubHomeComponent } from '../contractor-hub-home/contractor-hub-home.component';
import { ContractorAdviceComponent } from '../contractor-advice/contractor-advice.component';
import { ContractorAdviceArticleComponent } from '../contractor-advice-article/contractor-advice-article.component';
import { ContractorAdviceCategoryComponent } from '../contractor-advice-category/contractor-advice-category.component';


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
    "component" :ContractorHubHomeComponent
}, {
     "path" :"contractor-directory",
    "component" :ContractorDirectoryComponent
}, {
    "path": "companyProfile",
    "component": ContractorRecuriterProfileComponent
},{
    "path": "advice",
    "component": ContractorAdviceCategoryComponent
}]

@NgModule({
    imports:[RouterModule.forChild(contractorRoutes)],
    exports: [RouterModule]
})
export class ContractorRoutingModule {


}
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
import { ContractorSearchResultComponent } from '../contractor-search-result/contractor-search-result.component';
import { ResolverService } from '../resolver.service';


const contractorRoutes: Routes = [{
    "path": "profile",
    "component": ContractorProfileComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "viewProfile",
    "component": ContractorViewProfileComponent,
    "resolve": {resolverData: ResolverService}
},{
	"path" :"EditProfile",
	"component" :ContractorProfileComponent,
    "resolve": {resolverData: ResolverService}
},{
	"path" :"jobSearch",
	"component" :ContractorJobSearchComponent,
    "resolve": {resolverData: ResolverService}
},{
    "path" :"application",
    "component" :ContractorApplicationsComponent,
    "resolve": {resolverData: ResolverService}
},{
    "path" :"jobSavedSearch",
    "component" :ContractorJobSearchSavedComponent,
    "resolve": {resolverData: ResolverService}
},
{
    "path" :"hubHome",
    "component" :ContractorHubHomeComponent,
    "resolve": {resolverData: ResolverService}
}, {
     "path" :"contractor-directory",
    "component" :ContractorDirectoryComponent,
    "resolve": {resolverData: ResolverService}
}, {
    "path": "companyProfile",
    "component": ContractorRecuriterProfileComponent,
    "resolve": {resolverData: ResolverService}
},{
    "path": "advice",
    "component": ContractorAdviceCategoryComponent,
    "resolve": {resolverData: ResolverService}
},{
    "path": "adviceDetail",
    "component": ContractorAdviceArticleComponent,
    "resolve": {resolverData: ResolverService}
},{
    "path": "searchResult",
    "component": ContractorSearchResultComponent,
    "resolve": {resolverData: ResolverService}
}]

@NgModule({
    imports:[RouterModule.forChild(contractorRoutes)],
    exports: [RouterModule]
})
export class ContractorRoutingModule {


}
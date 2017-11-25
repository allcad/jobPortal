import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from '../content/content.component';
import { ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';
import { ContractorRecuriterProfileComponent } from '../contractor-recuriter-profile/contractor-recuriter-profile.component';
import { ContractorDirectoryComponent } from '../contractor-directory/contractor-directory.component';
import { LoginComponent } from '../login/login.component';
import { LoginRecruiterComponent } from '../login-recruiter/login-recruiter.component';
import { ContractorNewsArticleComponent } from '../contractor-news-article/contractor-news-article.component';
import { ContractorNewsCategoryComponent } from '../contractor-news-category/contractor-news-category.component';
//import { AboutContractorComponent } from '../about-contractor/about-contractor.component';
import { TermUseComponent } from '../term-use/term-use.component';
import { RecruiterTermsComponent } from '../recruiter-terms/recruiter-terms.component';
import { AboutRecruiterComponent } from '../about-recruiter/about-recruiter.component';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { FaqComponent } from '../faq/faq.component';
import { ContractorAdviceArticleComponent } from '../contractor-advice-article/contractor-advice-article.component';
import { ContractorAdviceCategoryComponent } from '../contractor-advice-category/contractor-advice-category.component';
import { ContractorHubHomeComponent } from '../contractor-hub-home/contractor-hub-home.component';
import { RecruiterGuidesPageComponent } from '../recruiter-guides-page/recruiter-guides-page.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { SiteMapComponent } from '../site-map/site-map.component';
import { ContractorJobSearchComponent } from '../contractor-job-search/contractor-job-search.component';
import { ContractorSearchResultComponent } from '../contractor-search-result/contractor-search-result.component';

const publicRoutes: Routes = [
{
    "path": "contractorSignup",
    "component": ContractorSignUpComponent
},{
    "path": "contractorLogin",
    "component": LoginComponent
}, {
    "path": "recruiterRegister",
    "component": RecruiterSignUpComponent
},{
    "path": "recruiterLogin",
    "component": LoginRecruiterComponent
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
    "path": "news",
    "component" : ContractorNewsArticleComponent
},{
    "path": "news_category",
    "component" : ContractorNewsCategoryComponent
},{
    "path": "terms_use",
    "component" : TermUseComponent
},{
    "path": "contractor_hub_home",
    "component" : ContractorHubHomeComponent
}, {
    "path": "recruiter-terms",
    "component": RecruiterTermsComponent
},{
    "path": "about-recruiter",
    "component": AboutRecruiterComponent
}, {
    "path": "contact-us",
    "component": ContactPageComponent
}, {
    "path": "faq",
    "component": FaqComponent
},{
    "path": "advice",
    "component": ContractorAdviceCategoryComponent
},{
    "path": "adviceDetail",
    "component": ContractorAdviceArticleComponent
},{
    "path": "guides",
    "component": RecruiterGuidesPageComponent
}, {
    "path": "privacy-policy",
    "component": PrivacyPolicyComponent
} , {
    "path": "site-map",
    "component": SiteMapComponent
},{
    "path": "jobSearch",
    "component": ContractorJobSearchComponent
},{
    "path" :"lastSearch",
    "component" :ContractorJobSearchComponent
}, {
    "path": "searchResult",
    "component": ContractorSearchResultComponent
},{
    "path": "",
    "redirectTo" : "home",
    "pathMatch" : "full"
}, {
    "path": '404', 
    "component": NotFoundPageComponent
},{
    "path": '**', 
    "redirectTo": '/404'
},]

@NgModule({
    imports:[RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {


}
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
import { AboutContractorComponent } from '../about-contractor/about-contractor.component';
import { TermUseComponent } from '../term-use/term-use.component';
import { RecruiterTermsComponent } from '../recruiter-terms/recruiter-terms.component';

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
    "path": "aboutContractor",
    "component" : AboutContractorComponent
},{
    "path": "terms_use",
    "component" : TermUseComponent
}, {
    "path": "recruiter-terms",
    "component": RecruiterTermsComponent
},{
    "path": "",
    "redirectTo" : "home",
    "pathMatch" : "full"
}]

@NgModule({
    imports:[RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {


}
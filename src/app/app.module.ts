import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {ToolTipModule} from 'angular2-tooltip';
import {TooltipModule} from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAdsComponent } from './header-ads/header-ads.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
// import { SearchComponent } from './search/search.component';
// import { UploadCvComponent } from './upload-cv/upload-cv.component';
// import { FindContractorComponent } from './find-contractor/find-contractor.component';
// import { ContractorServicesComponent } from './contractor-services/contractor-services.component';
// import { ContractorServiceListingComponent } from './contractor-service-listing/contractor-service-listing.component';
// import { ContractorServiceListingDetailsComponent } from './contractor-service-listing-details/contractor-service-listing-details.component';
// import { SocialMediaComponent } from './social-media/social-media.component';
// import { AdSpaceComponent } from './ad-space/ad-space.component';
// import { LatestNewsComponent } from './latest-news/latest-news.component';
// import { LatestNewsListingComponent } from './latest-news-listing/latest-news-listing.component';
// import { LatestNewsListingDetailsComponent } from './latest-news-listing-details/latest-news-listing-details.component';
// import { FindContractHubComponent } from './find-contract-hub/find-contract-hub.component';
import { FooterComponent } from './footer/footer.component';
// import { ContentBottomLeftAdsComponent } from './content-bottom-left-ads/content-bottom-left-ads.component';
// import { ContentBottomRightAdsComponent } from './content-bottom-right-ads/content-bottom-right-ads.component';
// import { ContractorServiceMenuListingComponent } from './contractor-service-menu-listing/contractor-service-menu-listing.component';
// import { ContractorSignUpComponent } from './contractor-sign-up/contractor-sign-up.component';
// import { LoginComponent } from './login/login.component';
//import { RecruiterSignUpComponent } from './recruiter-sign-up/recruiter-sign-up.component';
//import { ContentComponent } from './content/content.component';
import {AppRoutingModule} from './app-routing.module';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
//import { ContractorProfileComponent } from './contractor-profile/contractor-profile.component';
//import { ContractorViewProfileComponent } from './contractor-view-profile/contractor-view-profile.component';
// import { RecruiterManagePasswordComponent } from './recruiter-manage-password/recruiter-manage-password.component';
// import { RecruiterManageAccountComponent } from './recruiter-manage-account/recruiter-manage-account.component';
// import { RecruiterManageProfileComponent } from './recruiter-manage-profile/recruiter-manage-profile.component';
// import { RecruiterManageUserComponent } from './recruiter-manage-user/recruiter-manage-user.component';
import { CommonRequestService } from './common-request.service';
//import { LoginRecruiterComponent } from './login-recruiter/login-recruiter.component';
import { PublicComponent } from './public/public.component';
import { ContractorComponent } from './contractor/contractor.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { ContractorHeaderComponent } from './contractor-header/contractor-header.component';
import { RecruiterHeaderComponent } from './recruiter-header/recruiter-header.component';


import {PublicModule} from './public/public.module';


import {RecruiterModule} from './recruiter/recruiter.module';


import {ContractorModule} from './contractor/contractor.module';

import { AboutContractorComponent } from './about-contractor/about-contractor.component';
import { ContractorAdviceArticleComponent } from './contractor-advice-article/contractor-advice-article.component';
import { ContractorAdviceCategoryComponent } from './contractor-advice-category/contractor-advice-category.component';
import { ContractorAccountComponent } from './contractor-account/contractor-account.component';
import { ContractorApplicationsComponent } from './contractor-applications/contractor-applications.component';
import { ContractorDirectoryComponent } from './contractor-directory/contractor-directory.component';
import { ContractorHelpComponent } from './contractor-help/contractor-help.component';
import { ContractorHomeComponent } from './contractor-home/contractor-home.component';
import { ContractorRecuriterProfileComponent } from './contractor-recuriter-profile/contractor-recuriter-profile.component';
import { ContractorSearchResultComponent } from './contractor-search-result/contractor-search-result.component';
import { ContractorJobSearchSavedComponent } from './contractor-job-search-saved/contractor-job-search-saved.component';
import { ContractorJobSearchComponent } from './contractor-job-search/contractor-job-search.component';
import { ContractorLoginFullJobComponent } from './contractor-login-full-job/contractor-login-full-job.component';
import { ContractorNewsArticleComponent } from './contractor-news-article/contractor-news-article.component';
import { ContractorNewsCategoryComponent } from './contractor-news-category/contractor-news-category.component';
import { TermUseComponent } from './term-use/term-use.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderAdsComponent,
    HeaderLogoComponent,
    TopMenuComponent,
    // SearchComponent,
    // UploadCvComponent,
    // FindContractorComponent,
    // ContractorServicesComponent,
    // ContractorServiceListingComponent,
    // ContractorServiceListingDetailsComponent,
    // SocialMediaComponent,
    // AdSpaceComponent,
    // LatestNewsComponent,
    // LatestNewsListingComponent,
    // LatestNewsListingDetailsComponent,
    // FindContractHubComponent,
    FooterComponent,
    // ContentBottomLeftAdsComponent,
    // ContentBottomRightAdsComponent,
    // ContractorServiceMenuListingComponent,
    // ContractorSignUpComponent,
    // LoginComponent,
    //RecruiterSignUpComponent,
    //ContentComponent,
    // ContractorProfileComponent,
    // ContractorViewProfileComponent,
    // RecruiterManagePasswordComponent,
    // RecruiterManageAccountComponent,
    // RecruiterManageProfileComponent,
    // RecruiterManageUserComponent,
    //LoginRecruiterComponent,
    PublicComponent,
    ContractorComponent,
    RecruiterComponent,
    ContractorHeaderComponent,
    RecruiterHeaderComponent,
    AboutContractorComponent,
    ContractorAdviceArticleComponent,
    ContractorAdviceCategoryComponent,
    ContractorAccountComponent,
    ContractorApplicationsComponent,
    ContractorDirectoryComponent,
    ContractorHelpComponent,
    ContractorHomeComponent,
    ContractorRecuriterProfileComponent,
    ContractorSearchResultComponent,
    ContractorJobSearchSavedComponent,
    ContractorJobSearchComponent,
    ContractorLoginFullJobComponent,
    ContractorNewsArticleComponent,
    ContractorNewsCategoryComponent,
    TermUseComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    IonRangeSliderModule,
    FormsModule,
    ToolTipModule,
    TooltipModule,
    HttpModule,
    PublicModule,
    RecruiterModule,
    ContractorModule
  ],
  providers: [CommonRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

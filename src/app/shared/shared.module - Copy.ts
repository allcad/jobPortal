
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToolTipModule } from 'angular2-tooltip';
import { TooltipModule } from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import { FindContractHubComponent } from '../find-contract-hub/find-contract-hub.component';
import { ContractorServiceMenuListingComponent } from '../contractor-service-menu-listing/contractor-service-menu-listing.component';
import { ContractorServicesComponent } from '../contractor-services/contractor-services.component';
import { ContractorServiceListingComponent } from '../contractor-service-listing/contractor-service-listing.component';
import { ContractorServiceListingDetailsComponent } from '../contractor-service-listing-details/contractor-service-listing-details.component';
import { AdSpaceComponent } from '../ad-space/ad-space.component';
import { LatestNewsComponent } from '../latest-news/latest-news.component';
import { LatestNewsListingComponent } from '../latest-news-listing/latest-news-listing.component';
import { LatestNewsListingDetailsComponent } from '../latest-news-listing-details/latest-news-listing-details.component';
import { ContentBottomLeftAdsComponent } from '../content-bottom-left-ads/content-bottom-left-ads.component';
import { ContentBottomRightAdsComponent } from '../content-bottom-right-ads/content-bottom-right-ads.component';
import { SocialMediaComponent } from '../social-media/social-media.component';
import { ContractorRecuriterProfileComponent } from '../contractor-recuriter-profile/contractor-recuriter-profile.component';
import { ContractorDirectoryComponent } from '../contractor-directory/contractor-directory.component';
import { ContractorNewsArticleComponent } from '../contractor-news-article/contractor-news-article.component';
import { ContractorNewsCategoryComponent } from '../contractor-news-category/contractor-news-category.component';

import { CountdownPipe } from '../countdown.pipe';
import { SwiperModule } from 'angular2-useful-swiper';


import { ContractorHubHomeComponent } from '../contractor-hub-home/contractor-hub-home.component';
import { ContractorAdviceMenuListingComponent } from '../contractor-advice-menu-listing/contractor-advice-menu-listing.component';
import { ContractorAdviceListingComponent } from '../contractor-advice-listing/contractor-advice-listing.component';
import { ContractorAdviceComponent } from '../contractor-advice/contractor-advice.component';
import { ContractorAdviceArticleComponent } from '../contractor-advice-article/contractor-advice-article.component';
import { ContractorAdviceCategoryComponent } from '../contractor-advice-category/contractor-advice-category.component';
import { ContractorSearchResultComponent } from '../contractor-search-result/contractor-search-result.component';
import { ContractorJobSearchComponent } from '../contractor-job-search/contractor-job-search.component';
import { RecruiterSearchresultLoggedinComponent } from '../recruiter-searchresult-loggedin/recruiter-searchresult-loggedin.component';
import { RecruiterAdvancedSearchComponent } from '../recruiter-advanced-search/recruiter-advanced-search.component';
// import { RecruiterAdvancedSearchComponent } from '../recruiter-advanced-search/recruiter-advanced-search.component';
 import { RecruiterSavedSearchComponent } from '../recruiter-saved-search/recruiter-saved-search.component';
 import { ViewContractorProfileComponent } from '../view-contractor-profile/view-contractor-profile.component';
 import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    FindContractHubComponent,
    ContractorServicesComponent,
    ContractorServiceListingComponent,
    ContractorServiceListingDetailsComponent,
    AdSpaceComponent,
    LatestNewsComponent,
    LatestNewsListingComponent,
    LatestNewsListingDetailsComponent,
    ContractorServiceMenuListingComponent,
    ContractorRecuriterProfileComponent,
    ContractorDirectoryComponent,
    ContractorNewsArticleComponent,
    ContentBottomLeftAdsComponent,
    ContentBottomRightAdsComponent,
    SocialMediaComponent,
    CountdownPipe,
    ContractorNewsCategoryComponent,
    ContractorHubHomeComponent,
    ContractorAdviceMenuListingComponent,
    ContractorAdviceListingComponent,
    ContractorAdviceComponent,
    ContractorAdviceArticleComponent,
    ContractorAdviceCategoryComponent,
    ContractorSearchResultComponent,
    ContractorJobSearchComponent,
    RecruiterSearchresultLoggedinComponent,
     RecruiterAdvancedSearchComponent,
     RecruiterSavedSearchComponent,
     ViewContractorProfileComponent
  ],
  imports: [
    FormsModule,
    ToolTipModule,
    TooltipModule,
    HttpModule,
    CommonModule,
    SwiperModule,
    IonRangeSliderModule,
    ChartModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyANYk-sxj7-P1W8cB94WahJhtxdw1gEUJA",
      libraries: ["places"]
    })
  ],
  exports: [
    FindContractHubComponent,
    ContractorServicesComponent,
    ContractorServiceListingComponent,
    ContractorServiceListingDetailsComponent,
    AdSpaceComponent,
    LatestNewsComponent,
    LatestNewsListingComponent,
    LatestNewsListingDetailsComponent,
    ContractorServiceMenuListingComponent,
    ContentBottomLeftAdsComponent,
    ContentBottomRightAdsComponent,
    SocialMediaComponent,
    ContractorRecuriterProfileComponent,
    ContractorDirectoryComponent,
    CountdownPipe,
    ContractorNewsArticleComponent,
    ContractorNewsCategoryComponent,
    SwiperModule,
    IonRangeSliderModule,
    ContractorHubHomeComponent,
    ContractorSearchResultComponent,
    ContractorJobSearchComponent,
    RecruiterSearchresultLoggedinComponent,
     RecruiterAdvancedSearchComponent,
     RecruiterSavedSearchComponent,
     ViewContractorProfileComponent,
     ChartModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
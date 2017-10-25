
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { ContentComponent } from '../content/content.component';
import { SearchComponent } from '../search/search.component';
import { UploadCvComponent } from '../upload-cv/upload-cv.component';
import { FindContractorComponent } from '../find-contractor/find-contractor.component';
import { ContractorServicesComponent } from '../contractor-services/contractor-services.component';
import { ContractorServiceListingComponent } from '../contractor-service-listing/contractor-service-listing.component';
import { ContractorServiceListingDetailsComponent } from '../contractor-service-listing-details/contractor-service-listing-details.component';
import { SocialMediaComponent } from '../social-media/social-media.component';
import { AdSpaceComponent } from '../ad-space/ad-space.component';
import { LatestNewsComponent } from '../latest-news/latest-news.component';
import { LatestNewsListingComponent } from '../latest-news-listing/latest-news-listing.component';
import { LatestNewsListingDetailsComponent } from '../latest-news-listing-details/latest-news-listing-details.component';
import { FindContractHubComponent } from '../find-contract-hub/find-contract-hub.component';
import { ContentBottomLeftAdsComponent } from '../content-bottom-left-ads/content-bottom-left-ads.component';
import { ContentBottomRightAdsComponent } from '../content-bottom-right-ads/content-bottom-right-ads.component';
import { ContractorServiceMenuListingComponent } from '../contractor-service-menu-listing/contractor-service-menu-listing.component';

import { PublicRoutingModule } from './public-routing.module';
@NgModule({
  declarations: [
    ContentComponent,
   	SearchComponent,
	UploadCvComponent,
	FindContractorComponent,
	ContractorServicesComponent,
	ContractorServiceListingComponent,
	ContractorServiceListingDetailsComponent,
	SocialMediaComponent,
	AdSpaceComponent,
	LatestNewsComponent,
	LatestNewsListingComponent,
	LatestNewsListingDetailsComponent,
	FindContractHubComponent,
	ContentBottomLeftAdsComponent,
	ContentBottomRightAdsComponent,
	ContractorServiceMenuListingComponent
  ],
  imports: [
  	PublicRoutingModule,
  	CommonModule,
  	IonRangeSliderModule
  ],
  providers: []
})
export class PublicModule { }

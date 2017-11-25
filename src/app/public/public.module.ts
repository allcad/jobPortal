
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { FormsModule } from '@angular/forms';
import {ToolTipModule} from 'angular2-tooltip';
import {TooltipModule} from "ng2-tooltip";
import { HttpModule } from '@angular/http';

import { ContentComponent } from '../content/content.component';
import { SearchComponent } from '../search/search.component';
import { UploadCvComponent } from '../upload-cv/upload-cv.component';
import { FindContractorComponent } from '../find-contractor/find-contractor.component';

// import { FindContractHubComponent } from '../find-contract-hub/find-contract-hub.component';



import { ContractorJobSearchComponent } from '../contractor-job-search/contractor-job-search.component';
import { ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../shared/shared.module';

import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';
import { LoginRecruiterComponent } from '../login-recruiter/login-recruiter.component';

import { PublicRoutingModule } from './public-routing.module';
// import { AboutContractorComponent } from '../about-contractor/about-contractor.component';
import { TermUseComponent } from '../term-use/term-use.component';
import { RecruiterTermsComponent } from '../recruiter-terms/recruiter-terms.component';
import { AboutRecruiterComponent } from '../about-recruiter/about-recruiter.component';

import { ContactPageComponent } from '../contact-page/contact-page.component';
import { RecruiterGuidesPageComponent } from '../recruiter-guides-page/recruiter-guides-page.component';
import { FaqComponent } from '../faq/faq.component';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { SiteMapComponent } from '../site-map/site-map.component';
import { BenefitsComponent } from '../benefits/benefits.component';
import { SiteMaintenanceComponent } from '../site-maintenance/site-maintenance.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { ContractorSearchResultComponent } from '../contractor-search-result/contractor-search-result.component';

@NgModule({
  declarations: [
    ContentComponent,
   	SearchComponent,
	UploadCvComponent,
	FindContractorComponent,
	//AboutContractorComponent,
	TermUseComponent,
	// FindContractHubComponent,
	ContractorSearchResultComponent,
	ContractorSignUpComponent,
	LoginComponent,
	RecruiterSignUpComponent,
	LoginRecruiterComponent,
	RecruiterTermsComponent,
	AboutRecruiterComponent,
	ContactPageComponent,
    RecruiterGuidesPageComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    SiteMapComponent,
    BenefitsComponent,
    SiteMaintenanceComponent,
    NotFoundPageComponent,
    ContractorJobSearchComponent
  ],
  imports: [
  	PublicRoutingModule,
  	FormsModule,
  	ToolTipModule,
	TooltipModule,
	HttpModule,
	CommonModule,
	IonRangeSliderModule,
	SharedModule
  ],
  providers: []
})
export class PublicModule { }

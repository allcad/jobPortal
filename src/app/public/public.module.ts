
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




import { ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../shared/shared.module';

import { RecruiterSignUpComponent } from '../recruiter-sign-up/recruiter-sign-up.component';
import { LoginRecruiterComponent } from '../login-recruiter/login-recruiter.component';

import { PublicRoutingModule } from './public-routing.module';
// import { AboutContractorComponent } from '../about-contractor/about-contractor.component';
import { TermUseComponent } from '../term-use/term-use.component';
import { RecruiterTermsComponent } from '../recruiter-terms/recruiter-terms.component';

@NgModule({
  declarations: [
    ContentComponent,
   	SearchComponent,
	UploadCvComponent,
	FindContractorComponent,
	//AboutContractorComponent,
	TermUseComponent,
	// FindContractHubComponent,
	
	ContractorSignUpComponent,
	LoginComponent,
	RecruiterSignUpComponent,
	LoginRecruiterComponent,
	RecruiterTermsComponent
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

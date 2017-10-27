import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ToolTipModule} from 'angular2-tooltip';
import {TooltipModule} from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'; 
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { ContractorRoutingModule } from './contractor-routing.module';
//import {ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { ContractorProfileComponent } from '../contractor-profile/contractor-profile.component';
import { ContractorViewProfileComponent } from '../contractor-view-profile/contractor-view-profile.component';
import { ContractorJobSearchComponent } from '../contractor-job-search/contractor-job-search.component';
import { ContractorApplicationsComponent } from '../contractor-applications/contractor-applications.component';
import { ContractorJobSearchSavedComponent } from '../contractor-job-search-saved/contractor-job-search-saved.component';
import { ContractorDirectoryComponent } from '../contractor-directory/contractor-directory.component';
import { SharedModule } from '../shared/shared.module';
import { ContractorRecuriterProfileComponent } from '../contractor-recuriter-profile/contractor-recuriter-profile.component';
// import { FindContractHubComponent } from '../find-contract-hub/find-contract-hub.component';


//import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [
   
	ContractorProfileComponent,
	ContractorViewProfileComponent,
  ContractorJobSearchComponent,
  ContractorApplicationsComponent,
  ContractorJobSearchSavedComponent,
  ContractorDirectoryComponent,
  ContractorRecuriterProfileComponent
	
  ],
  imports: [
   CommonModule,
    FormsModule,
   ToolTipModule,
	TooltipModule,
	HttpModule,
	ContractorRoutingModule,
	IonRangeSliderModule,
  SharedModule
  ],
  providers: []
})
export class ContractorModule { }

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
//import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [
   // ContractorSignUpComponent,
	ContractorProfileComponent,
	ContractorViewProfileComponent,
	//LoginComponent
  ],
  imports: [
   CommonModule,
    FormsModule,
   ToolTipModule,
	TooltipModule,
	HttpModule,
	ContractorRoutingModule,
	IonRangeSliderModule
  ],
  providers: []
})
export class ContractorModule { }

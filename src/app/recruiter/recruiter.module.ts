import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ToolTipModule} from 'angular2-tooltip';
import {TooltipModule} from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'; 
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { RecruiterRoutingModule } from './recruiter-routing.module'
import { RecruiterManagePasswordComponent } from '../recruiter-manage-password/recruiter-manage-password.component';
import { RecruiterManageAccountComponent } from '../recruiter-manage-account/recruiter-manage-account.component';
import { RecruiterManageProfileComponent } from '../recruiter-manage-profile/recruiter-manage-profile.component';
import { RecruiterManageUserComponent } from '../recruiter-manage-user/recruiter-manage-user.component';
import { LoginRecruiterComponent } from '../login-recruiter/login-recruiter.component';


@NgModule({
  declarations: [
    RecruiterManagePasswordComponent,
	RecruiterManageAccountComponent,
	RecruiterManageProfileComponent,
	RecruiterManageUserComponent,
	LoginRecruiterComponent
  ],
  imports: [
   
   FormsModule,
   ToolTipModule,
	TooltipModule,
	HttpModule,
	RecruiterRoutingModule,
	CommonModule,
	IonRangeSliderModule
  ],
  providers: []
})
export class RecruiterModule { }

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

import { FooterComponent } from './footer/footer.component';

import {AppRoutingModule} from './app-routing.module';
import { IonRangeSliderModule } from "ng2-ion-range-slider";

import { CommonRequestService } from './common-request.service';

import { PublicComponent } from './public/public.component';
import { ContractorComponent } from './contractor/contractor.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { ContractorHeaderComponent } from './contractor-header/contractor-header.component';
import { RecruiterHeaderComponent } from './recruiter-header/recruiter-header.component';


import {PublicModule} from './public/public.module';


import {RecruiterModule} from './recruiter/recruiter.module';


import {ContractorModule} from './contractor/contractor.module';

import { AboutContractorComponent } from './about-contractor/about-contractor.component';
//import { ContractorAdviceArticleComponent } from './contractor-advice-article/contractor-advice-article.component';

import { ContractorAccountComponent } from './contractor-account/contractor-account.component';

import { ContractorHelpComponent } from './contractor-help/contractor-help.component';


//import { ContractorSearchResultComponent } from './contractor-search-result/contractor-search-result.component';

import { ContractorLoginFullJobComponent } from './contractor-login-full-job/contractor-login-full-job.component';
import { ContractorNewsArticleComponent } from './contractor-news-article/contractor-news-article.component';
import { ContractorNewsCategoryComponent } from './contractor-news-category/contractor-news-category.component';
import { TermUseComponent } from './term-use/term-use.component';
import { CommonDataSharedService } from './commonDataSharedService';
import { ResolverService } from './resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderAdsComponent,
    HeaderLogoComponent,
    TopMenuComponent,
    
    FooterComponent,
    
    PublicComponent,
    ContractorComponent,
    RecruiterComponent,
    ContractorHeaderComponent,
    RecruiterHeaderComponent,
    AboutContractorComponent,
    ContractorAccountComponent,
   
    ContractorHelpComponent,
    
    
    // ContractorSearchResultComponent,
    
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
  providers: [CommonRequestService, CommonDataSharedService, ResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
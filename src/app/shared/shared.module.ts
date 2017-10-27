
import { NgModule } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {ToolTipModule} from 'angular2-tooltip';
import {TooltipModule} from "ng2-tooltip";
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { FindContractHubComponent } from '../find-contract-hub/find-contract-hub.component';
@NgModule({
  declarations: [
   FindContractHubComponent,
  ],
  imports: [
    FormsModule,
ToolTipModule,
TooltipModule,
HttpModule,
CommonModule
  ],
  exports: [
FindContractHubComponent,
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }

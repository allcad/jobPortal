import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ReferenceListComponent } from './components/reference-list/reference-list.component';
import {ContractorSignUpComponent } from '../contractor-sign-up/contractor-sign-up.component';
import { ContractorProfileComponent } from '../contractor-profile/contractor-profile.component';
import { ContractorViewProfileComponent } from '../contractor-view-profile/contractor-view-profile.component';


const contractorRoutes: Routes = [{
    "path": "register",
    "component": ContractorSignUpComponent
}, {
    "path": "profile",
    "component": ContractorProfileComponent
}, {
    "path": "view-profile",
    "component": ContractorViewProfileComponent
}]

@NgModule({
    imports:[RouterModule.forChild(contractorRoutes)],
    exports: [RouterModule]
})
export class ContractorRoutingModule {


}
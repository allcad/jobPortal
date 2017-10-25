import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from '../content/content.component';

const publicRoutes: Routes = [{
	"path": "",
    "component": ContentComponent
}]

@NgModule({
    imports:[RouterModule.forChild(publicRoutes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {


}
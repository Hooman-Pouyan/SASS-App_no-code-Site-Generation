import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ControllerComponent } from './controller/controller.component';
import { SharedModule } from '../../shared/shared.module';
import { DefaultProjectComponent } from './projects-pages/default-project/default-project.component';
import { RenovationProjectsComponent } from './projects-pages/renovation-projects/renovation-projects.component';
import { FooterModule } from '../pages/footer/footer.module';
import { HeaderModule } from '../pages/header/header.module';
import { BeerSliderModule } from '../../shared/beer-slider/beer-slider.module';


@NgModule({
  declarations: [
    ControllerComponent,
    DefaultProjectComponent,
    RenovationProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    FooterModule,
    BeerSliderModule,
    HeaderModule
  ]
})
export class ProjectsModule { }

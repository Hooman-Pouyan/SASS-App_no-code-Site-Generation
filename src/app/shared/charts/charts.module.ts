import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  exports:[
    ChartsComponent
  ]
})
export class ChartsModule { }

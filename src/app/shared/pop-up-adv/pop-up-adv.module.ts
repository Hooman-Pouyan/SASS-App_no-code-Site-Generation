import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopUpAdvComponent} from './pop-up-adv.component';
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    PopUpAdvComponent,
  ],
  exports: [
    PopUpAdvComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PopUpAdvModule {
}

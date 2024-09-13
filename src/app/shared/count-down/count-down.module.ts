import { NgModule } from '@angular/core';
import {SharedModule} from "../shared.module";
import {CountDownComponent} from "./count-down.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CountDownComponent
  ],
  exports:[
    CountDownComponent
  ]
})
export class CountdownModule {}

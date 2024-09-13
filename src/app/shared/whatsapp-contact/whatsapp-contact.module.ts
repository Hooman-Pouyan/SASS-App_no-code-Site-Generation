import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WhatsappContactComponent} from "./whatsapp-contact.component";
import {SharedModule} from "../shared.module";



@NgModule({
  declarations: [
    WhatsappContactComponent,
  ],
  exports: [
    WhatsappContactComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class WhatsappContactModule { }

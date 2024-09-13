import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsFormComponent } from './contact-us-form.component';
import {SharedModule} from "../shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ContactUsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ContactUsFormComponent
  ]
})
export class ContactUsFormModule { }

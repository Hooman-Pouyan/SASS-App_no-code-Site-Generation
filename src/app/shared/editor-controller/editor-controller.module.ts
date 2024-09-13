import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorControllerComponent } from './editor-controller.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    EditorControllerComponent
  ],
  exports: [
    EditorControllerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditorControllerModule { }

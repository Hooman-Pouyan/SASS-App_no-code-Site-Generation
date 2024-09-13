import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDialogComponent } from './search-dialog.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    SearchDialogComponent
  ],
  exports: [
    SearchDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]

})
export class SearchDialogModule { }

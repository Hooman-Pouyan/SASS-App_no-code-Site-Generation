import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenovationStoreRoutingModule } from './renovation-store-routing.module';
import { RenovationStoreComponent } from './renovation-store.component';
import { StoreSubCategoriesComponent } from './store-sub-categories/store-sub-categories.component';
import { RenovationStoreHeaderComponent } from './components/renovation-store-header/renovation-store-header.component';
import { SharedModule } from "../../../../shared/shared.module";
import { RenovationPreStoreComponent } from './renovation-pre-store/renovation-pre-store.component';
import { HeaderModule } from '@app/modules/pages/header/header.module';
import { FooterModule } from '@app/modules/pages/footer/footer.module';
import { RenovationStoreCategoriesListComponent } from './components/renovation-store-categories-list/renovation-store-categories-list.component';

@NgModule({
  declarations: [
    RenovationStoreComponent,
    StoreSubCategoriesComponent,
    RenovationStoreHeaderComponent,
    RenovationStoreCategoriesListComponent,
    RenovationPreStoreComponent,
    RenovationStoreHeaderComponent
  ],
  imports: [
    CommonModule,
    RenovationStoreRoutingModule,
    HeaderModule,
    SharedModule,
    FooterModule
  ]
})
export class RenovationStoreModule { }

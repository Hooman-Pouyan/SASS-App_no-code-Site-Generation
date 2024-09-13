import {NgModule} from '@angular/core';
import {SharedModule} from '@app/shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    HeaderModule,
    FooterModule,
  ],
  declarations: [
    ProfileComponent,
  ],

})
export class ProfileModule {
}

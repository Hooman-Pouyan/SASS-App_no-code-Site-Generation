import {NgModule} from '@angular/core';
import {AboutUsRoutingModule} from './about-us-routing.module';
import {AboutUsComponent} from './about-us.component';
import {SharedModule} from '@app/shared/shared.module';
import {FooterModule} from "../footer/footer.module";
import {HeaderModule} from "../header/header.module";
import {ContactUsFormModule} from "@app/shared/contact-us-form/contact-us.module";
import {FeatureSliderModule} from "@app/shared/feature-slider/feature-slider.module";

@NgModule({
    imports: [
        SharedModule,
        AboutUsRoutingModule,
        FooterModule,
        HeaderModule,
        ContactUsFormModule,
        FeatureSliderModule
    ],
  declarations: [
    AboutUsComponent,
  ],
  exports: [
    AboutUsComponent,
  ]
})
export class AboutUsModule {
}

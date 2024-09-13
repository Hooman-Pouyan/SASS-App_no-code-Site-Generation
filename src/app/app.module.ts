import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {SharedModule} from './shared/shared.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from 'src/environments/environment';
import {WhatsappContactModule} from "src/app/shared/whatsapp-contact/whatsapp-contact.module";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SwiperModule} from 'swiper/angular';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "angularx-social-login";
import {LayoutComponent} from "./modules/layout/layout.component";
import {HeaderDrawerModule} from "@app/shared/header-drawer/header-drawer.module";
import {CartSidenavModule} from "@app/shared/cart-sidenav/cart-sidenav.module";
import {MiniContactUsModule} from "@app/shared/mini-contact-us/mini-contact-us.module";
import {EditorControllerModule} from "@app/shared/editor-controller/editor-controller.module";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {initializeAppCustomLogic} from "@app/initializer/app.initializer";
import {Router} from "@angular/router";
import {TopWebBannerModule} from "@app/shared/top-web-banner/top-web-banner.module";

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LayoutComponent
  ],
  imports: [
    CoreModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    SwiperModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
    WhatsappContactModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SocialLoginModule,
    HeaderDrawerModule,
    CartSidenavModule,
    MiniContactUsModule,
    EditorControllerModule,
    TopWebBannerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '135608334439-5vhik4o0t0b1o6tuil7uh931no7gu57l.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppCustomLogic,
      deps: [StoreSettingService, Router],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

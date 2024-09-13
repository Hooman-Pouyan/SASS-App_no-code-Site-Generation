import {StoreSettingService} from "../core/services/store-setting.service";
import {Router} from "@angular/router";


export function initializeAppCustomLogic(storeSettingService: StoreSettingService, router: Router): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      storeSettingService.getStoreId().subscribe(
        res => {
          storeSettingService.id = res[0].ID
          resolve()
        },
        () => {
          router.navigate(['/error'])
        }
      )
    });
}

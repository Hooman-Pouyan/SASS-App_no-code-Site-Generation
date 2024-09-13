import {ProductSliderModel} from "@app/core/models/product.model";

export interface CategoryModel {
  ADDITIONAL_COST?: number
  NAME: string,
  PRODUCT_CATEGORY?: number
  PRODUCT_ID: number
  PRODUCT_NAME?: string,

  // local variables
  subCategories?: CategoryModel[],
  products?: ProductSliderModel[],
  showByScroll?: boolean
}

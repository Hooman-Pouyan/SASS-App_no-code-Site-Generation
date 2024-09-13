export interface ProductModel {
  AVAILABILITY: number,
  PRODUCT_LIMITATION: number,
  HAS_GUARANTEE: 0 | 1
  ID: number
  IS_FAVORIT: boolean
  ADDITIONAL_COST: number
  APARAT_LINK: string
  BARCODE: string
  COUNTER: number,
  CREATE_DATE: Date,
  AMAZING_END_DATE:string,
  AMAZING_START_DATE:string,
  DESCRIPTION: string
  DIGIKALA_LINK: string
  DIGI_PRICE: number
  GENEALOGY: string
  GENEALOGY_NAME: string,
  category_genealogy: {
    ID: number,
    NAME: string
  }[]
  PRODUCT_STORE_ID: number
  IMAGE: string
  LINK: string
  NAME: string
  POINT: number
  PRODUCT_BRAND_ID: number
  PRODUCT_CATEGORY: number
  PRODUCT_PARENT: { NAME: string, ID: number }
  product_brand: { NAME: string, ID: number }
  PRODUCT_STATUS_ID: number
  PRODUCT_UNIT_ID: number
  PRODUCT_UNIT_NAME: number
  PRICE_AFTER_OFFER: number
  PRICE: number
  productAdditional: ProductAdditionalModel,
  productImages: {
    IMAGE: string
    ORDERS: number
  }[],
  product_features: ProductFeatureModel[],
  product_colors: ProductFeatureModel[],
  product_sizes: ProductFeatureModel[],
}

export interface ProductFavoriteModel {
  ID: number,
  IS_FAVORIT: boolean,
  PRODUCT_ID: number,
  PRODUCT_STORE_ID: number,
  ADDITIONAL_COST: 0
  GENEALOGY: string
  GENEALOGY_NAME: string
  IMAGE: string
  NAME: string
  PRODUCT_CATEGORY: number
  product_brand: { NAME: string },
  product_status: { NAME: string },
  product_unit: { NAME: string, NAME_EN:string },
  PRICE: number,
  category_genealogy: {
    ID: number,
    NAME: string
  }[]
  PRICE_AFTER_OFFER: number,
  product_stores: {
    product_store_prices: {
      PRICE: number
      PRICE_AFTER_OFFER: number
    }[]
  }[]
}

export interface ProductAdditionalModel {
  ADITIONAL_PRICE: number
  DEPTH: number
  HEIGHT: number
  ID: number
  LONG_DESCRIPTION: string
  META_DESCRIPTION: string
  META_TITLE: string
  META_URL: string
  PRODUCT_ID: number
  SEARCH: number
  SHORT_DESCRIPTION: string
  TAG: string
  VIEWS: number
  WEIGHT: number
  WIDTH: number
}

export interface ProductFeatureModel {
  FEATURE_ID: number
  ID: number
  PARENT: ProductFeatureModel
  PARENT_ID: number
  PRODUCT_ID: number
  VALUE: string
  selected: boolean
  feature: { ID: number, NAME: string }
}

export interface ProductSliderModel {
  CATEGORY_ID: number
  IMAGE: string,
  NAME: string
  PRICE: number
  PRICE_AFTER_OFFER: number
  PRODUCT_BRAND_NAME: string,
  SHORT_DESCRIPTION: string,
  HAS_GUARANTEE: 0 | 1
  PRODUCT_ID: number
  PRODUCT_PARENT_NAME: string,
  CATEGORY_NAME: string,
  PRODUCT_STATUS_ID: ProductStatus
  PRODUCT_STORE_ID: number
  PRODUCT_UNIT_ID: ProductUnitStatus,
}

export interface ProductCommentModel {
  COMMENTS: {
    COMMENTS: string
    COMMENT_ID: number
    CREATE_DATE: Date
    NAME: string
    RATE: number
    USER_NAME: string
    DISLIKE: number,
    LIKES: number,
    LIKED: number,
    STRENGTHS:string;
    WEAK_POINTS:string;
  }[]
  CLASSIFY:{
    NAME:string,
    NEGATIVE_OPINION:number
    POSITIVE_OPINION:number,
    QUALITY_CLASSIFY_ID:number
  }[]
  PAGINATION?: {
    PAGE_NUMBER: string
    PAGE_SIZE: number
    TOTAL_COUNT: number
    TOTAL_PAGES: number
  }
}

export interface ProductSpecifications {
  NAME: string,
  NAME_EN: string,
  ORDERS: number,
  CATEGORY_ID: number,
  PARENT_ID: number | null,
  SHOW_IN_SEARCH: 0 | 1,
  SHOW_IN_COMPARE: 0 | 1,
  SHOW_IN_FILTER: 0 | 1,
  REQUIRE: 0 | 1,
  ID: number,

  // local variables
  subSpecifications: ProductSpecifications[],
  canAddNewSpecification: boolean,
  isEdit: boolean
}

export interface ProductQ_A {
  DATA: {
    CREATE_DATETIME?: string;
    DELETED?: number;
    ID?: number;
    PARENT_QUESTION_ID?: number;
    PRODUCT_STORE_ID?: number;
    QUESTION_ID?: number;
    HAS_IDENTIFIED?: number;
    QUESTION?: string;
    SORT?: number;
    USER_ROLE_ID?: number;
    ANSWER?: ProductQ_A
    DISLIKE: number,
    LIKES: number,
    LIKED: number,
    NAME: string,
    USER_NAME: string,
  }[]
  PAGINATION?: {
    PAGE_NUMBER: string
    PAGE_SIZE: number
    TOTAL_COUNT: number
    TOTAL_PAGES: number
  }
}


export function ProductStatusName(status: ProductStatus): string {
  switch (status) {
    case ProductStatus.inStock:
      return 'موجود'
    case ProductStatus.outStock:
      return 'ناموجود'
    case ProductStatus.new:
      return 'جدید'
    case ProductStatus.old:
      return 'قدیمی'
    case ProductStatus.disallowed:
      return 'ممنوع شده'
    case ProductStatus.unknown:
      return 'نامشخص'
    case ProductStatus.noPhoto:
      return 'بدون عکس'
  }
}

export function checkProductStatus(status: ProductStatus): boolean {
  return !(status == ProductStatus.outStock || status == ProductStatus.disallowed || status == ProductStatus.erased);
}

export enum ProductStatus {
  inStock = 1,
  outStock,
  new,
  old,
  disallowed,
  erased,
  unknown,
  noPhoto = 100000
}

export enum ProductUnitStatus {
  kilogram = 1,
  number,
  package
}

export enum ProductSliderType {
  bestSellers = 'getBestSellers',
  latest = 'getLatest',
  categories = 'getMainCategories',
  mostVisited = 'getMostVisited',
  fakeMostVisited = 'fakegetMostVisited',
  mostOffers = 'getstoreoffer',
  groupsOffers = 'getGroupsUser'

}

export enum ProductsFilter {
  mostExpensive = 1,
  cheapest,
  mostViewed,
  mostDiscount,
  mostSell,
}

export enum ProductsQA_Action {
  mostExpensive = -1,
  cheapest,
  mostViewed,

}


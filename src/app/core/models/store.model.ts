export interface StoreModel {
  id?: number,
  name: string,
  logo: string,
  phone: string,
  email: string,
  socials: SocialMediaContact[],
  laws: string,
  aboutUs: string,
  address: string,
  etemad_electronic: string,
  samandehiImg: string,
  samandehiLink: string,
  samandehiId: string,
  questions: Q_A[],
  help: string,
  returnOfGoods: string,
  appLink: string,
  appSectionImage?: string,
  desktopBanner?: string,
  mobileBanner?: string,
  motto?: string,
  minToBuy?: number,
  guaranteePrice?: number,
  supportNumbers: {VALUE: string}[]
}

export interface SocialMediaContact {
  type: SocialType,
  link: string
}

export interface Q_A {
  ID: number,
  QUESTION: string,
  ANSWER: string
}

export interface WorkDaysModel {
  DESCRIPTION: string
  END_TIME: string
  END_TIME2: string
  HOLIDAY: number
  ID: number
  START_TIME: string
  START_TIME2: string
  WEEK_DAY: number,
  date: Date,
  workHours: {
    startTime: any,
    endTime: any,
  }[]
}

export interface StoreBrandsModel {
  DESCRIPTION: string
  ID: number
  IMAGE: string
  NAME: string
}


export enum SocialType {
  whatsapp = 'whatsapp',
  telegram = 'telegram',
  instagram = 'instagram',
  facebook = 'facebook',
  linkedin = 'linkedin',
  youtube = 'youtube',
  aparat = 'aparat',
}

export enum BannerType {
  slider = 1,
  help ,
  brands,
  aboutUs,
  returnOfGoods,
  storeBanner,
  popUp = 8,
  clubBanner,
}

export enum StoreSettingType {
  logo = 'LOGO',
  favIcon = 'FAV_ICON',
  aboutUs = 'ABOUT_US',
  returnGoods = 'RETURN_OF_GOOD',
  guide = 'GUIDE',
  rules = 'RULES',
  etemadElectronic = 'ETEMAD_ELECTRONIC_LINK',
  samandehi = 'SAMANDEHI_LINK',
  goftino = 'GOFTINO',
  yektanet = 'YEKTANET',
  clarity = 'CLARITY',
  googleAnalytics = 'GOOGLE_ANALYTICS',
  googleTagManager = 'GOOGLE_TAG_MANAGER',
  googleSearchConsole = 'GOOGLE_SEARCH_CONSOLE'
}

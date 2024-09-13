export interface LandingModel {
  CREATE_DATE: Date
  ID: number
  THEME_ID: number
  VALUE: string
  VALUE_TYPE: string
}

export interface LandingAttributeModel {
  image?: string,
  text?: string,
  link?: string,
  image_type?: string,
  text_type?: string,
  link_type?: string
}

export interface LandingCategoriesModel {
  NAME: string,
  IMAGE: string,
  SELECTED_CATEGORIES: string,
  ID: number
}

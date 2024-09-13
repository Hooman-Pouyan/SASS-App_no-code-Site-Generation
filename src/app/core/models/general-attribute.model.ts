export interface GeneralAttributeModel {
  ID: number,
  FILES: string,
  TITLE: string,
  DESCRIPTION: string,
  SORT: number,
  TYPE: GeneralAttributeType,
  USER_ID: number,
  CREATE_DATE: Date,
  TAGS: string
}

 export enum GeneralAttributeType {
   blog = 1,
   article,
   news,
   attribute
 }

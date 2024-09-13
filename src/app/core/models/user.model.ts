export interface UserModel {
  ADMIN_HAS_IDENTIFIED: number,
  AVATAR: string,
  AVATAR_URL: string,
  CREATE_DATE: Date
  DELETED: boolean
  HAS_IDENTIFIED: boolean
  ID: number,
  INTRODUCTRY_CODE: string
  INTRODUCTRY_DEST_CREATE_DATE: Date
  INTRODUCTRY_DEST_USER_ID: number
  INTROD_USING_STATUS: 0
  NAME: string,
  POINT: number,
  RANK: number,
  USER_NAME: string,
  user_additional: {
    USER_ID: number,
    EMAIL:string,
    BIRTH_DATE: Date
    CITY: string
    EDUCATION: string
    GENDER: string
    PASTIME: string
    PROVINCE: string
  },
  user_roles: UserRolesModel[]
}

export interface UserRolesModel {
  CREATE_DATE: Date
  DELETED: boolean
  ID: number
  REFERRAL_CODE: string
  ROLE_ID: number
  USER_ID: number
}

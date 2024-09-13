export enum UserRoles {
  customer = 1,
  provider,
  courier,
  admin,
  appUsers,
  support,
  guest,
  product
}

export interface UserLoginModel {
  ID: number
  NAME: string
  ROLE_ID: UserRoles
  TOKEN: string
  USER_NAME: string
  USER_ROLE_ID: number,
  user_roles?: {
    ID: number
    ROLE_ID: number
  }[]
}

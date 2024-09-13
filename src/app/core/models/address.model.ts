export interface AddressModel {
  ADDRESS: string
  AREA: number
  COUNTRY_DIVISION_ID: number
  ID: number
  LOCATION: number[]
  NAME: string,
  POSTAL_CODE: string
  PROVINCE_ID: string
  SELECTED: number
  TOWNSHIP_ID: string
  TOWNSHIP_NAME: string
  UR_ID: number
  X: number
  Y: number
}

export interface ProvinceModel {
  ID: string
  PROVINCE_NAME: string
}

export interface CityModel {
  ID: string
  PROVINCE_NAME: string
  TOWNSHIP_NAME: string
}

export interface CoordinateModel {
  accuracy: number
  altitude: number
  altitudeAccuracy: number
  heading: number
  latitude: number
  longitude: number
  speed: number
}

export interface SearchedAddressModel {
  address: string
  category: string
  region: string
  title: string
  type: string,
  location: {
    x: number
    y: number
    z: number
  }
}

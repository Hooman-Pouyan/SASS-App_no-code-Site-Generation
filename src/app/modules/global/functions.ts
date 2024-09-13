import {FormGroup} from "@angular/forms";
import {CoordinateModel} from "@app/core/models/address.model";

/**
 * return An unique array from the array you send as parameter
 *
 * @param array the array you want to make it unique.
 * @param uniqueObject The unique Object of array you want to remove duplicate by (OPTIONAL).
 *
 * @return An `Array` of the unique array.
 */
export function removeDuplicateFromArray(array: any[], uniqueObject?: any): any[] {
  if (uniqueObject) {
    return array.filter((v, i, a) => a.findIndex(t => (t[uniqueObject] === v[uniqueObject])) === i)
  }
  return Array.from(new Set(array));
}

/**
 * return discount percentage of two prices
 *
 * @param originalPrice the first price of the item.
 * @param afterDiscountPrice the 2th price of the item after discount.
 *
 * @return An `number` as the discount percentage.
 */
export function calculateDiscount(originalPrice: number, afterDiscountPrice: number): number {
  let discount: number = 100 - (afterDiscountPrice / originalPrice) * 100;
  return +discount.toFixed(1)
}

/**
 * copy text into the clipboard
 *
 * @param text the text you want to copy
 *
 */
export function copyText(text: string): void {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = text;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}

/**
 * return shuffled array
 *
 * @param array the array that you want to shuffle.
 *
 * @return An `array` as the shuffled array.
 */
export function shuffle(array: any[]): any[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * return prices after the tax's set
 *
 * @param originalPrice the first price of the item.
 * @param taxValue the percentage Value of the Tax.
 *
 * @return An `number` as the Price.
 */
export function calculateTax(originalPrice: number, taxValue: number): number {
  let afterTaxPrice: number = originalPrice * (1 + taxValue);
  return Math.round(afterTaxPrice);
}

/**
 * return converted persian word to english
 *
 * @param persian the persian string you want to convert
 *
 * @return converted english word
 */
export function p2e(persian: any) {
  return persian?.toString().replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
}

/**
 * return Unique random Number
 *
 * @param range how many numbers to create
 * @param outputCount how many numbers to return
 *
 * @return uniqueNumbers return an array of Unique Numbers
 */
export function randomUniqueNum(range, outputCount): any[] {
  let arr = []
  for (let i = 1; i <= range; i++) {
    arr.push(i)
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}

/**
 * check if password confirm is true or not
 *
 * @param form the form to check passwords (FormGroup)
 * @param passwordField password field name in formGroup
 * @param confirmField confirm password field name in formGroup
 *
 */
export function checkPasswordConfirm(form: FormGroup, passwordField: string, confirmField: string): void {
  form.valueChanges.subscribe(res => {
    if (res[confirmField] && res[passwordField]) {
      if (res[confirmField] !== res[passwordField]) {
        form.controls[confirmField].setErrors({'incorrect': true})
      }
      if (res[confirmField] === res[passwordField]) {
        form.controls[confirmField].setErrors(null)
      }
    }
  })
}

/**
 * intersect two array with their unique key of each other
 *
 * @param arr1 first array
 * @param arr1Key key to check first array
 * @param arr2 second array
 * @param arr2Key key to check second array
 *
 * @return intersectedArray return an array of intersected arrays
 */
export function intersectionByKey(arr1: any[], arr2: any[], arr1Key?: string, arr2Key?: string): any[] {

  if (arr1Key && arr2Key) {
    return arr1.filter(
      (set => a => true === set.has(a[arr1Key]))(new Set(arr2.map(b => b[arr2Key])))
    );
  } else if (arr1Key && !arr2Key) {
    return arr1.filter(
      (set => a => true === set.has(a[arr1Key]))(new Set(arr2.map(b => b)))
    );
  } else if (!arr1Key && arr2Key) {
    return arr1.filter(
      (set => a => true === set.has(a))(new Set(arr2.map(b => b[arr2Key])))
    );
  } else {
    return arr1.filter(
      (set => a => true === set.has(a))(new Set(arr2.map(b => b)))
    );
  }


}


/**
 * intersect two array with their unique key of each other
 *
 * @param value string to mask
 * @param pattern pattern you want to make into
 *
 * @return string shifted string with pattern
 */
export function maskString(value: string, pattern: string): string {
  let count: number = 0;
  return pattern.replace(/\+/g, () => value[count++] || '')
}


/**
 * get User current location if user granted access
 *
 *
 * @return coordinate
 */
export function getCoords(): Promise<CoordinateModel> {
  return new Promise((resolve) =>
    navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords))
  )
}


export function extractGenealogy(genealogy: string, index: 'parent' | 'first_parent'): string {
  let gen: string[] = genealogy.split(',').filter(f => f)
  gen.pop();
  gen.shift();

  if (index == 'parent') {
    return gen[gen.length - 1]
  } else {
    return gen[0]
  }
}

/**
 * random string with limited length
 *
 * @param length length of string
 *
 * @return randomString return a random number between two input number
 */
export function getRandomString(length): string {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}


/**
 * random string with limited length
 *
 * @param dataURI dataURI
 * @param filePrefix prefix name of file
 *
 * @return randomString return a random number between two input number
 */
export function dataURItoBlob(dataURI, filePrefix: string): File {
  const byteString = atob(dataURI.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const imageBlob = new Blob([int8Array], {type: 'image/png'});
  return new File([imageBlob], `${filePrefix}_${getRandomString(10)}.png`, {type: 'image/png'})
}

/**
 * return a distance between two geology point
 *
 * @param lat1 first point latitude
 * @param lon1 first point longitude
 * @param lat2 second point latitude
 * @param lon2 second point longitude
 * @param unit determine the output unit (K: Kilometer, N: newton)
 *
 * @return randomString distance between two geology point
 */
export function geologyDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'K' | 'N'): number {
  const radLat1 = Math.PI * lat1 / 180
  const radLat2 = Math.PI * lat2 / 180
  const theta = lon1 - lon2
  const radTheta = Math.PI * theta / 180
  let dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") {
    dist = dist * 1.609344
  }
  if (unit == "N") {
    dist = dist * 0.8684
  }
  return dist
}

/**
 * return adjusted color
 *
 * @param color color as HEX
 * @param amount amount of adjustment
 *
 * @return newColor adjusted color
 */
export function adjustColor(color: string, amount: number): string {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

/**
 * change hex to rgba then convert to hex
 *
 * @param color color as HEX
 * @param opacity opacity between 0 to 1
 *
 * @return newColor hex color
 */
export function HEXtoRGBA(color: string, opacity: number): string {
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}


export function isInViewportFromBottom(el: Element): boolean {
  const rect = el?.getBoundingClientRect();
  return rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight)
}

export function isInViewPort(el: Element): boolean {
  const rect = el.getBoundingClientRect();

  return rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
}

export function isValidNationalCode(NationalCode: string): boolean {
  const fakeCode = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"]

  let Arr = Array.from(NationalCode)
  if (fakeCode.some(e => e == NationalCode)) {
    return false
  } else if (Arr.length != 10) {
    return false
  } else {
    let Sum = 0;
    let Last;

    for (let i = 0; i < 9; i++) {
      Sum += +Arr[i] * (10 - i)
    }
    let divideRemaining = Sum % 11;
    if (divideRemaining < 2) {
      Last = divideRemaining;
    } else {
      Last = 11 - (divideRemaining);
    }
    let n = Arr[9];
    return Last == n
  }
}

